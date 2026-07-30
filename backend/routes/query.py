from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from cypher_chain import TextToCypherChain
from database import db

# Clean router configuration (main.py handles /api prefix)
router = APIRouter(tags=["Natural Language Query"])

class QueryRequest(BaseModel):
    question: str = Field(..., min_length=3, description="Natural language question must be at least 3 characters long")
    entity_context: str = Field(default="None", description="Optional extracted entities context")

chain = TextToCypherChain()

@router.post("/query", status_code=status.HTTP_200_OK)
def ask_knowledge_graph(request: QueryRequest):
    """
    Converts English query to Cypher and executes against Neo4j with error handling.
    """
    clean_question = request.question.strip()
    if not clean_question:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Question cannot be empty or blank spaces."
        )

    try:
        generated_cypher = chain.generate_cypher(clean_question, request.entity_context)
        results = db.execute_query(generated_cypher)
        
        return {
            "status": "success",
            "question": clean_question,
            "generated_cypher": generated_cypher,
            "results": results,
            "count": len(results)
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database or Cypher Execution Error: {str(e)}"
        )