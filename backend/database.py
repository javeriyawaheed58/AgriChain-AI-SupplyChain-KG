import os
from neo4j import GraphDatabase
from dotenv import load_dotenv

load_dotenv()

# URI Fallback Fix (Convert neo4j:// to bolt:// if needed)
raw_uri = os.getenv("NEO4J_URI", "bolt://localhost:7687")
if raw_uri.startswith("neo4j://"):
    NEO4J_URI = raw_uri.replace("neo4j://", "bolt://")
else:
    NEO4J_URI = raw_uri

# Username Fallback Fix (Supports both NEO4J_USER and NEO4J_USERNAME)
NEO4J_USER = os.getenv("NEO4J_USER") or os.getenv("NEO4J_USERNAME") or "neo4j"
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "password123")

class Neo4jDatabase:
    def __init__(self):
        try:
            self.driver = GraphDatabase.driver(
                NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD)
            )
            print(f"Connected to Neo4j successfully at {NEO4J_URI} as {NEO4J_USER}")
        except Exception as e:
            print(f"Failed to create Neo4j driver: {e}")
            self.driver = None

    def close(self):
        if self.driver:
            self.driver.close()

    def execute_query(self, query: str, parameters: dict = None):
        if not self.driver:
            return []
        with self.driver.session() as session:
            result = session.run(query, parameters or {})
            return [record.data() for record in result]

db = Neo4jDatabase()

def check_db_connection() -> bool:
    """Verifies connection to Neo4j database."""
    try:
        if db.driver:
            db.driver.verify_connectivity()
            return True
        return False
    except Exception as e:
        print(f"Database connection error: {e}")
        return False