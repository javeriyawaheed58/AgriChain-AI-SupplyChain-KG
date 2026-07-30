from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from core_logic import process_supply_chain_nodes
from report_generator import generate_supply_chain_report

app = FastAPI(
    title="Farm Supply Chain Knowledge Graph API",
    version="2.0",
    description="Dynamic REST API for Supply Chain Node Processing & Graph Sync"
)

# Input Data Schema Definition
class SupplyChainEntity(BaseModel):
    entity_id: str
    name: Optional[str] = "UNKNOWN"
    type: str

class ProcessRequest(BaseModel):
    entities: List[SupplyChainEntity]

@app.get("/")
def home():
    return {"status": "Active", "message": "Farm Supply Chain API Phase 2 is Running Live"}

@app.post("/api/v1/process-nodes")
def process_nodes_endpoint(request: ProcessRequest):
    try:
        # Convert Pydantic models to dict format for pipeline
        raw_data = [entity.dict() for entity in request.entities]
        
        # Run Step 2.1, 2.2, & 2.5 (Pipeline + Core Logic + Neo4j)
        processed_records, stats = process_supply_chain_nodes(raw_data)
        
        # Run Step 2.3 (Report Generation)
        report_text = generate_supply_chain_report(stats)
        
        return {
            "success": True,
            "message": "Nodes processed and synced with Neo4j successfully.",
            "statistics": stats,
            "data": processed_records
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))