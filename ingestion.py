from neo4j import GraphDatabase
from pipeline import clean_and_validate_supply_chain_data

NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "password123"

def create_constraints_and_indexes():
    """
    Step 3.2: Database constraints aur indexes banata hai.
    """
    driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    
    # 1. Unique Constraint Query
    constraint_query = """
    CREATE CONSTRAINT supply_chain_id_unique IF NOT EXISTS
    FOR (n:SupplyChainNode) REQUIRE n.id IS UNIQUE
    """
    
    # 2. Indexing Query for Type Search
    index_query = """
    CREATE INDEX supply_chain_type_index IF NOT EXISTS
    FOR (n:SupplyChainNode) ON (n.type)
    """
    
    try:
        with driver.session() as session:
            session.run(constraint_query)
            print("✓ [Step 3.2] Neo4j Constraint: Unique ID constraint created/verified.")
            
            session.run(index_query)
            print("✓ [Step 3.2] Neo4j Index: Entity type index created/verified.")
    except Exception as e:
        print(f"⚠ [Step 3.2] Constraint Note: {e}")
    finally:
        driver.close()

def run_cypher_ingestion(records):
    driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    
    node_query = """
    UNWIND $records AS record
    MERGE (n:SupplyChainNode {id: record.entity_id})
    SET n.name = record.name,
        n.type = record.type
    RETURN count(n) as node_count
    """
    
    rel_query = """
    MATCH (f:SupplyChainNode {type: 'Farm'}), (p:SupplyChainNode {type: 'Processing Unit'})
    MERGE (f)-[r1:SUPPLIES_TO]->(p)
    WITH p
    MATCH (d:SupplyChainNode {type: 'Distributor'})
    MERGE (p)-[r2:SHIPS_TO]->(d)
    WITH d
    MATCH (r:SupplyChainNode {type: 'Retailer'})
    MERGE (d)-[r3:DELIVERS_TO]->(r)
    RETURN count(*) as rel_count
    """
    
    try:
        with driver.session() as session:
            res_nodes = session.run(node_query, records=records)
            print(f"✓ [Step 3.1] Nodes Ingested: {res_nodes.single()['node_count']} nodes updated/created.")
            
            res_rels = session.run(rel_query)
            print("✓ [Step 3.1] Cypher Relationships Ingestion Completed.")
    except Exception as e:
        print(f"⚠ [Step 3.1] Ingestion Error: {e}")
    finally:
        driver.close()

if __name__ == "__main__":
    print("--- Running Phase 3: Step 3.1 & 3.2 ---")
    
    # Step 3.2: Create Constraints & Indexes
    create_constraints_and_indexes()
    
    # Step 3.1: Run Ingestion
    sample_data = [
        {"entity_id": "F_101", "name": "Green Acres Farm", "type": "Farm"},
        {"entity_id": "P_201", "name": "Agro Processing Hub", "type": "Processing Unit"},
        {"entity_id": "D_301", "name": "National Logistics", "type": "Distributor"},
        {"entity_id": "R_401", "name": "Metro Retail Store", "type": "Retailer"}
    ]
    
    cleaned_records = clean_and_validate_supply_chain_data(sample_data).to_dict(orient='records')
    run_cypher_ingestion(cleaned_records)