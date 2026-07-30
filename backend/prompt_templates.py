from langchain_core.prompts import PromptTemplate

# Updated Schema with Destination
GRAPH_SCHEMA = """
Nodes and Properties:
- Farm {id, name, location}
- Batch {id, crop_type, harvest_date, quantity}
- Shipment {id, dispatch_date, status, destination}
- QualityReport {id, issue_type, severity, report_date}

Relationships:
- (Farm)-[:PRODUCED]->(Batch)
- (Batch)-[:SHIPPED_VIA]->(Shipment)
- (Shipment)-[:HAS_REPORT]->(QualityReport)
"""

FEW_SHOT_EXAMPLES = """
Example 1:
User Question: Which batches were produced by Green Acres Farm Ltd.?
Extracted Entity: Farm: Green Acres Farm Ltd.
Cypher Query: MATCH (f:Farm)-[:PRODUCED]->(b:Batch) WHERE toLower(f.name) CONTAINS toLower('Green Acres Farm Ltd.') RETURN b.id, b.crop_type, b.harvest_date

Example 2:
User Question: Find all shipments for Batch-9081.
Extracted Entity: Batch: Batch-9081
Cypher Query: MATCH (b:Batch)-[:SHIPPED_VIA]->(s:Shipment) WHERE b.id = 'Batch-9081' RETURN s.id, s.status, s.dispatch_date

Example 3:
User Question: Show all quality reports associated with Metro Retail Store HQ shipments.
Extracted Entity: Shipment destination: Metro Retail Store HQ
Cypher Query: MATCH (s:Shipment)-[:HAS_REPORT]->(q:QualityReport) WHERE toLower(s.destination) CONTAINS toLower('Metro Retail Store HQ') RETURN q.issue_type, q.severity, s.id
"""

CYPHER_GENERATION_TEMPLATE = f"""
You are an expert Neo4j Cypher translator for a Farm Supply Chain Knowledge Graph.
Your task is to convert a user's natural language question into a valid Cypher query based on the graph schema and examples provided below.

Graph Schema:
{{schema}}

Few-Shot Examples:
{FEW_SHOT_EXAMPLES}

Entity Context:
{{entity_context}}

User Question:
{{question}}

CRITICAL INSTRUCTIONS:
1. Return ONLY the executable Cypher query.
2. Do NOT write any explanations, thought processes, corrections, or intro text.
3. Do NOT wrap output in markdown code blocks or backticks.
4. Always use toLower() for string matching.

Cypher Query:
"""

def get_cypher_prompt():
    return PromptTemplate(
        input_variables=["schema", "entity_context", "question"],
        template=CYPHER_GENERATION_TEMPLATE
    )