from neo4j import GraphDatabase
from pipeline import clean_and_validate_supply_chain_data

NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "password123"

def push_nodes_and_relations_to_neo4j(records):
    """
    Step 2.7: Neo4j mein Nodes aur unke Connective Relationships create karta hai.
    """
    driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    
    # Query 1: Create Nodes
    node_query = """
    UNWIND $records AS record
    MERGE (n:SupplyChainNode {id: record.entity_id})
    SET n.name = record.name,
        n.type = record.type
    """
    
    # Query 2: Create Sequential Relationships between Entities
    rel_query = """
    MATCH (f:SupplyChainNode {type: 'Farm'}), (p:SupplyChainNode {type: 'Processing Unit'})
    MERGE (f)-[:SUPPLIES_TO]->(p)
    WITH p
    MATCH (d:SupplyChainNode {type: 'Distributor'})
    MERGE (p)-[:SHIPS_TO]->(d)
    WITH d
    MATCH (r:SupplyChainNode {type: 'Retailer'})
    MERGE (d)-[:DELIVERS_TO]->(r)
    """
    
    try:
        with driver.session() as session:
            session.run(node_query, records=records)
            session.run(rel_query)
            print("✓ [Step 2.7] Neo4j Graph DB: Nodes & Relationships successfully linked.")
    except Exception as e:
        print(f"⚠ [Step 2.7] Neo4j Sync Note: {e}")
    finally:
        driver.close()

def process_supply_chain_nodes(raw_data):
    cleaned_df = clean_and_validate_supply_chain_data(raw_data)
    processed_records = cleaned_df.to_dict(orient='records')
    
    # Call relationship logic
    push_nodes_and_relations_to_neo4j(processed_records)
    
    summary_stats = {
        "total_nodes": len(processed_records),
        "node_types": cleaned_df["type"].value_counts().to_dict() if "type" in cleaned_df.columns else {}
    }
    
    print("✓ [Step 2.2] Core Logic: Supply Chain Processing Completed.")
    return processed_records, summary_stats