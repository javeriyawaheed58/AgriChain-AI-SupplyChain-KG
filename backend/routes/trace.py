from fastapi import APIRouter, HTTPException
from database import db

router = APIRouter(prefix="/api/traceability", tags=["Traceability"])

@router.get("/farm/{farm_id}")
def get_farm_details(farm_id: str):
    """Farm details aur uske produced batches fetch karta hai"""
    query = """
    MATCH (f:Farm) WHERE toLower(f.id) = toLower($farm_id) OR toLower(f.name) CONTAINS toLower($farm_id)
    OPTIONAL MATCH (f)-[:PRODUCED]->(b:Batch)
    RETURN f AS farm, collect(b) AS batches
    """
    records = db.execute_query(query, {"farm_id": farm_id})
    if not records or not records[0]["farm"]:
        raise HTTPException(status_code=404, detail="Farm not found")
    return records[0]

@router.get("/batch/{batch_id}")
def trace_batch(batch_id: str):
    """Batch ki complete lifecycle trace karta hai (Farm -> Batch -> Shipment -> QualityReport)"""
    query = """
    MATCH (b:Batch) WHERE toLower(b.id) = toLower($batch_id)
    OPTIONAL MATCH (f:Farm)-[:PRODUCED]->(b)
    OPTIONAL MATCH (b)-[:SHIPPED_VIA]->(s:Shipment)
    OPTIONAL MATCH (s)-[:HAS_REPORT]->(q:QualityReport)
    RETURN b AS batch, f AS farm, collect(DISTINCT s) AS shipments, collect(DISTINCT q) AS quality_reports
    """
    records = db.execute_query(query, {"batch_id": batch_id})
    if not records or not records[0]["batch"]:
        raise HTTPException(status_code=404, detail="Batch not found")
    return records[0]