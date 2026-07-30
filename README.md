🌾 AgriChain AI: Enterprise Farm Supply Chain Knowledge Graph & Traceability Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Python Version](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![Neo4j](https://img.shields.io/badge/Neo4j-5.x-008CC1.svg)](https://neo4j.com/)
[![LLM Engine](https://img.shields.io/badge/LLM-LLaMA--3.3--70B-orange.svg)](https://groq.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8.svg)](https://tailwindcss.com/)

An enterprise-ready, agentic AI platform designed for agricultural supply chain operations. AgriChain AI bridges natural language querying with **Neo4j Knowledge Graphs** via an optimized **LLaMA-3.3-70B Text-to-Cypher engine**, enabling instant origin tracing, defective batch detection, and dynamic logistics visualization.

🌟 Executive Summary & Problem Statement

Modern agricultural supply chains suffer from fragmented tracking systems, making defective stock recall and origin auditing slow and prone to errors. When a bad batch arrives at a distribution hub, manual lookup across multiple relational tables delays critical decisions.

AgriChain AI solves this by:
1. Graph-Native Modeling: Modeling entity relationships directly ($Farm \xrightarrow{\text{PRODUCED}} Batch \xrightarrow{\text{SHIPPED\_VIA}} Shipment$).
2. Natural Language Interface: Allowing operators to ask natural language questions (e.g., *"Which farm produced BATCH-101 and when was it harvested?"*) without knowing Cypher or SQL.
3. Real-Time Visual Trace: Rendering interactive force-directed graph trails alongside contextual AI text responses.
   

✨ Key Platform Features

- 🧠 Agentic Text-to-Cypher Engine: Converts natural language prompts into optimized, syntactically correct Cypher graph database queries powered by LangChain and Groq.
- 🕸️ Interactive Knowledge Graph Explorer: 2D interactive force graph visualization utilizing physics simulation to render connected nodes (Farms, Batches, Shipments) and custom edges.
- 🚚 End-to-End Batch Traceability Stepper: Visual step-by-step audit trail component mapping harvest dates, quality audits, carrier assignments, and transit statuses.
- 🎨 Adaptive UI & Dual Theme Architecture: Native Dark and Light theme switching across all views, graph containers, and notification modals.
- 📊 Enterprise KPI Dashboard: Provides actionable metrics, system logs, and intelligent recommendations for supply chain optimization.


🏗️ System Architecture & Workflow
               ┌─────────────────────────────────────────┐
               │           React 18 Frontend             │
               │   (Tailwind CSS, Force-Graph-2D, Vite)  │
               └────────────────────┬────────────────────┘
                                    │
                         HTTP REST  │ POST /api/query
                                    ▼
               ┌─────────────────────────────────────────┐
               │            FastAPI Backend              │
               └────────────────────┬────────────────────┘
                                    │
             ┌──────────────────────┴──────────────────────┐
             │                                             │
             ▼                                             ▼
┌─────────────────────────┐                   ┌──────────────────────────┐
│  LangChain + Groq LLM   │                   │ Neo4j Graph Database     │
│  (LLaMA-3.3-70B Model)  │                   │ (Bolt Protocol Driver)   │
└────────────┬────────────┘                   └────────────┬─────────────┘
             │ Generates Cypher                            │ Executes Query
             └──────────────────────┬──────────────────────┘
                                    │
                                    ▼
                      ┌──────────────────────────┐
                      │  Structured Graph JSON   │
                      │  Payload + Visual Trace  │
                      └──────────────────────────┘

                      
🗄️ Knowledge Graph Entity Relationship Model
The graph structure is defined by the following directional relationship schema:

$$\text{(Farm:Farm)} \xrightarrow{[:\text{PRODUCED}]} \text{(Batch:Batch)} \xrightarrow{[:\text{SHIPPED\_VIA}]} \text{(Shipment:Shipment)}$$
Farm Node: Properties include id, name, location.
Batch Node: Properties include id, product, quantity, harvest_date.
Shipment Node: Properties include id, carrier, status, dispatch_date.


📂 Repository Structure
AgriChain-AI-SupplyChain-KG/

├── backend/
│   ├── app.py                 # FastAPI Web Server & Router Definitions
│   ├── core_logic.py          # Text-to-Cypher Chain & LangChain Groq Pipeline
│   ├── database.py            # Neo4j Driver Connection & Cypher Execution Wrappers
│   └── report_generator.py    # PDF Audit Report Exporter Utility
├── frontend/
│   ├── src/
│   │   ├── components/        # Header, Sidebar, Legend Controls
│   │   ├── pages/             # Dashboard, Chat, KnowledgeGraph, Traceability
│   │   ├── App.jsx            # Main App Layout & Theme Router
│   │   └── main.jsx           # React DOM Entrypoint
│   ├── package.json
│   └── tailwind.config.js
├── data/                      # Sample Datasets & Ingestion Scripts
├── screenshots/               # Architectural Verification Screenshots
├── .gitignore
├── README.md
└── docker-compose.yml


⚡ API Endpoint Specification
POST /api/query
Executes a natural language prompt against the graph database engine.

Request Header:
Content-Type: application/json

Request Body:JSON{
  "question": "Show details for BATCH-101 and its harvest date",
  "entity_context": "None"
}

Successful Response (200 OK):
JSON{
  "status": "success",
  "generated_cypher": "MATCH (f:Farm)-[r:PRODUCED]->(b:Batch {id: 'BATCH-101'}) RETURN f, b",
  "count": 1,
  "results": [
    {
      "farm": {
        "name": "Green Valley Farm",
        "location": "Punjab, Pakistan"
      },
      "batch": {
        "id": "BATCH-101",
        "product": "Fresh Mangoes",
        "quantity": "500 kg",
        "harvest_date": "2026-06-15"
      }
    }
  ]
}


🛠️ Local Installation & Setup Guide
1. Prerequisites
Ensure you have the following installed locally:
Python 3.10+
Node.js v18+ & npm
Neo4j Desktop or Neo4j AuraDB instance

2. Environment Configuration
Create a .env file in the root directory:

Code snippet

GROQ_API_KEY=your_groq_api_key_here
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_neo4j_password


4. Backend Setup
Bash
# Initialize Python Virtual Environment
python -m venv .venv
source .venv/bin/activate 

# On Windows: 
.venv\Scripts\activate

# Install Required Dependencies
pip install fastapi uvicorn neo4j langchain-groq pydantic python-dotenv

# Run FastAPI Server
uvicorn backend.app:app --reload --port 8000

4. Frontend Setup
   
Bash
# Navigate to Frontend Directory
cd frontend
# Install Dependencies
npm install

# Start Vite Development Server
npm run dev

Open your browser and navigate to http://localhost:5173 or http://localhost:5174.

👩‍💻 Author & Maintainer
Javeriya Waheed
GitHub: @javeriyawaheed58
Specialization: Artificial Intelligence, Software Engineering & Knowledge Graphs
