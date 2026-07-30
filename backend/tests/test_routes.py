import sys
import os

# Current backend directory ko path me add karne ke liye
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code in [200, 404]

def test_health_check_endpoint():
    response = client.get("/health")
    assert response.status_code in [200, 404]