import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes.trace import router as traceability_router
from routes.query import router as query_router
from database import check_db_connection

load_dotenv()

app = FastAPI(
    title="Farm Supply Chain API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(traceability_router, prefix="/api", tags=["Traceability"])
app.include_router(query_router, prefix="/api", tags=["Query & RAG"])

@app.get("/")
async def root():
    return {"status": "online", "message": "Farm Supply Chain API is running"}

@app.get("/health")
async def health_check():
    db_status = check_db_connection()
    return {
        "status": "healthy" if db_status else "degraded",
        "database_connected": db_status
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)