import os
from neo4j import GraphDatabase
from dotenv import load_dotenv

load_dotenv()

# URI and Credentials
NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
if NEO4J_URI.startswith("neo4j://"):
    NEO4J_URI = NEO4J_URI.replace("neo4j://", "bolt://")

NEO4J_USER = os.getenv("NEO4J_USER") or os.getenv("NEO4J_USERNAME") or "neo4j"
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "password123")

# Cypher Script to populate sample supply chain data
SEED_CYPHER = """
// 1. Clear existing test data (Optional)
// MATCH (n) DETACH DELETE n;

// 2. Create Farms
CREATE (f1:Farm {id: 'F101', name: 'Green Valley Farm', location: 'Punjab'})
CREATE (f2:Farm {id: 'F102', name: 'Organic Orchard', location: 'KPK'})

// 3. Create Batches
CREATE (b1:Batch {id: 'BATCH-101', product: 'Fresh Mangoes', harvest_date: '2026-06-15', quantity: '500 kg'})
CREATE (b2:Batch {id: 'BATCH-102', product: 'Red Apples', harvest_date: '2026-07-01', quantity: '1000 kg'})

// 4. Create Shipments
CREATE (s1:Shipment {id: 'SHP-2001', carrier: 'FastLogistics', dispatch_date: '2026-06-17', status: 'Delivered'})
CREATE (s2:Shipment {id: 'SHP-2002', carrier: 'ColdChain Express', dispatch_date: '2026-07-03', status: 'In Transit'})

// 5. Create Relationships
CREATE (f1)-[:PRODUCED]->(b1)
CREATE (f2)-[:PRODUCED]->(b2)

CREATE (b1)-[:SHIPPED_VIA]->(s1)
CREATE (b2)-[:SHIPPED_VIA]->(s2)
"""

def seed_database():
    try:
        driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
        with driver.session() as session:
            session.run(SEED_CYPHER)
            print("✅ Sample data successfully inserted into Neo4j Database!")
            print("   - Added Farms: F101 (Green Valley), F102 (Organic Orchard)")
            print("   - Added Batches: BATCH-101, BATCH-102")
            print("   - Added Shipments: SHP-2001, SHP-2002")
        driver.close()
    except Exception as e:
        print(f"❌ Ingestion Error: {e}")

if __name__ == "__main__":
    seed_database()