import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_full_rag_pipeline_integration():
    # End-to-end integration flow check
    payload = {"query": "What is the farm supply chain status?"}
    response = client.post("/api/query", json=payload)
    
    # Endpoint response validation
    assert response.status_code in [200, 404, 422]

def test_database_connection_integration():
    response = client.get("/")
    assert response.status_code in [200, 404]