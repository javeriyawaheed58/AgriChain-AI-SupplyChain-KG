🌾 AgriChain AI
Enterprise Farm Supply Chain AI Agent & Knowledge Graph System

*Natural Language Querying · Real-Time Knowledge Graph · End-to-End Batch Traceability*

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Neo4j](https://img.shields.io/badge/Neo4j-Graph_DB-008CC1?logo=neo4j&logoColor=white)](https://neo4j.com/)
[![LangChain](https://img.shields.io/badge/LangChain-Groq-1C3C3C?logo=langchain&logoColor=white)](https://www.langchain.com/)
[![Groq](https://img.shields.io/badge/LLM-Llama_3.3_70B-F55036?logo=meta&logoColor=white)](https://groq.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

</div>

---

## 📖 Executive Overview

**AgriChain AI** is a production-grade, AI-powered supply chain intelligence platform purpose-built for the agricultural sector. It combines a **Neo4j graph database**, a **LangChain + Groq-powered natural language reasoning engine**, and a **real-time interactive graph visualization frontend** to give farm supply chain operators instant, conversational access to their entire distribution network — from farm to retailer.

### The Problem

Modern farm supply chains generate enormous volumes of relational data — farms, harvest batches, shipments, warehouses, quality inspections, and retail deliveries — but this data is typically siloed across relational databases and spreadsheets that are painfully slow to query for two mission-critical questions:

1. **"Where did this batch actually come from, and where did it go?"** — Batch Origin Traceability
2. **"Which other batches are at risk given this one defective shipment?"** — Defective Stock Detection & Containment

Traditional SQL-based systems require multiple slow, hand-written JOIN queries to answer these questions, and non-technical staff (quality managers, compliance officers, operations leads) cannot self-serve this information without engineering support.

### The Solution

AgriChain AI models the entire supply chain as a **native property graph**, allowing multi-hop traceability questions to be answered in milliseconds via graph traversal instead of expensive relational joins. A **natural language interface**, powered by `llama-3.3-70b-versatile` via Groq and orchestrated through LangChain, translates plain-English questions into validated Cypher queries — removing the technical barrier entirely. Results are rendered as an interactive, force-directed knowledge graph and a chronological traceability timeline, giving operators both the "what" and the "why" in one interface.

---

## ✨ Key Features

- 🗣️ **Natural Language Cypher Querying** — Ask questions in plain English; the system generates and safely executes the corresponding Cypher query against Neo4j.
- 🕸️ **Real-Time Interactive Knowledge Graph** — Visualize farms, batches, shipments, warehouses, and retailers as an explorable force-directed graph (`react-force-graph-2d`), with full Light & Dark theme support.
- 📦 **End-to-End Batch Traceability Timeline** — Reconstructs the complete chronological journey of any batch from harvest to final retail delivery.
- 🚨 **Defective Stock Detection** — Instantly traces a flagged quality issue back to its origin farm and identifies all co-shipped batches at risk.
- 📊 **Analytics Dashboard** — Live KPIs and charts summarizing supply chain health, batch volumes, shipment status, and quality trends.
- 🌗 **Light & Dark Theme Support** — Fully themed UI across chat, graph canvas, and dashboard components.
- 🔒 **Query Guardrails** — Read-only Cypher validation layer prevents destructive or unauthorized graph mutations from LLM-generated queries.

---

## 🏗️ Tech Stack

| Layer          | Technology                                                   |
|----------------|----------------------------------------------------------------|
| Frontend       | React (Vite), Tailwind CSS, Lucide React Icons, react-force-graph-2d |
| Backend        | FastAPI (Python)                                                |
| AI Orchestration | LangChain + Groq (`llama-3.3-70b-versatile`)                  |
| Database       | Neo4j (Cypher Query Engine)                                     |

---

## 🚀 Installation & Setup Guide

### Prerequisites

Ensure the following are installed on your system before proceeding:

| Requirement       | Minimum Version | Notes                                   |
|--------------------|------------------|-------------------------------------------|
| Python             | 3.11+            | For the FastAPI backend                    |
| Node.js            | 18+              | For the React (Vite) frontend              |
| npm / pnpm / yarn  | Latest           | Package manager of choice                  |
| Neo4j              | 5.x              | Desktop, AuraDB, or self-hosted             |
| Groq API Key       | —                | [Create one here](https://console.groq.com/) |
| Git                | Latest           | For cloning the repository                 |

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-org>/agrichain-ai.git
cd agrichain-ai
```

---

### 2️⃣ Neo4j Setup

**Option A — Neo4j Desktop (Local Development)**

1. Download and install [Neo4j Desktop](https://neo4j.com/download/).
2. Create a new local DBMS (Neo4j 5.x) and set a database password.
3. Start the database instance.
4. Note the Bolt connection URI (default: `bolt://localhost:7687`).

**Option B — Neo4j AuraDB (Cloud, Recommended for Production)**

1. Create a free/paid instance at [Neo4j Aura](https://neo4j.com/cloud/aura/).
2. Save the generated connection URI, username, and password securely.

**Load the Schema & Sample Data**

```bash
# From the /database directory
cypher-shell -a bolt://localhost:7687 -u neo4j -p <your-password> -f schema.cypher
cypher-shell -a bolt://localhost:7687 -u neo4j -p <your-password> -f seed_data.cypher
```

---

### 3️⃣ Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

pip install -r requirements.txt
```

**Create a `.env` file** inside the `/backend` directory:

```env
# ---------------------------
# Neo4j Configuration
# ---------------------------
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_neo4j_password
NEO4J_DATABASE=neo4j

# ---------------------------
# Groq / LangChain Configuration
# ---------------------------
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL_NAME=llama-3.3-70b-versatile

# ---------------------------
# Application Configuration
# ---------------------------
APP_ENV=development
CORS_ORIGINS=http://localhost:5173
LOG_LEVEL=INFO
```

**Run the backend server:**

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`, with interactive Swagger docs at `http://localhost:8000/docs`.

---

### 4️⃣ Frontend Setup (React + Vite)

```bash
cd frontend
npm install
```

**Create a `.env` file** inside the `/frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_DEFAULT_THEME=light
```

**Run the development server:**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

**Production build:**

```bash
npm run build
npm run preview
```

---

## 📡 API Endpoint Documentation

### `POST /api/query`

Accepts a natural language question, converts it into a validated Cypher query via the LangChain + Groq reasoning layer, executes it against Neo4j, and returns a structured JSON response suitable for both chat display and graph rendering.

**Request**

```http
POST /api/query
Content-Type: application/json
```

```json
{
  "query": "Show me all batches from Green Valley Farm that were flagged as defective in the last 30 days",
  "session_id": "optional-session-uuid"
}
```

| Field        | Type   | Required | Description                                      |
|--------------|--------|----------|----------------------------------------------------|
| `query`      | string | ✅ Yes    | Natural language question from the user             |
| `session_id` | string | ❌ No     | Optional identifier for conversation/session context |

**Response — `200 OK`**

```json
{
  "success": true,
  "generated_cypher": "MATCH (f:Farm {name: 'Green Valley Farm'})-[:PRODUCED]->(b:Batch)-[:INSPECTED_BY]->(q:QualityCheck) WHERE q.result = 'defective' AND q.date >= date() - duration('P30D') RETURN f, b, q",
  "answer_summary": "Found 3 defective batches originating from Green Valley Farm in the last 30 days.",
  "graph_data": {
    "nodes": [
      { "id": "farm_001", "label": "Green Valley Farm", "type": "Farm" },
      { "id": "batch_045", "label": "Batch #045", "type": "Batch" }
    ],
    "links": [
      { "source": "farm_001", "target": "batch_045", "relationship": "PRODUCED" }
    ]
  },
  "records": [
    { "batch_id": "batch_045", "harvest_date": "2026-07-05", "status": "defective" }
  ],
  "execution_time_ms": 142
}
```

**Response — `400 Bad Request`**

```json
{
  "success": false,
  "error": "Query could not be interpreted. Please rephrase your question."
}
```

**Response — `500 Internal Server Error`**

```json
{
  "success": false,
  "error": "Database connection failed. Please try again later."
}
```

---

## 📁 Project Folder Structure

agrichain-ai/
│
├── backend/
│ ├── main.py # FastAPI application entrypoint
│ ├── requirements.txt
│ ├── .env # Backend environment variables (not committed)
│ ├── app/
│ │ ├── api/
│ │ │ ├── routes_query.py # /api/query endpoint
│ │ │ ├── routes_graph.py # /api/graph endpoint
│ │ │ ├── routes_traceability.py
│ │ │ └── routes_analytics.py
│ │ ├── core/
│ │ │ ├── config.py # Environment/config loader
│ │ │ └── security.py
│ │ ├── services/
│ │ │ ├── langchain_service.py # LangChain + Groq orchestration
│ │ │ ├── cypher_guard.py # Query validation/guardrails
│ │ │ └── neo4j_service.py # Neo4j driver + query execution
│ │ ├── models/
│ │ │ └── schemas.py # Pydantic request/response models
│ │ └── utils/
│ │ └── formatters.py # Graph JSON formatting helpers
│ └── tests/
│ ├── test_query_endpoint.py
│ └── test_cypher_guard.py
│
├── frontend/
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ ├── tailwind.config.js
│ ├── .env
│ └── src/
│ ├── main.jsx
│ ├── App.jsx
│ ├── components/
│ │ ├── ChatInterface/
│ │ ├── KnowledgeGraph/ # react-force-graph-2d wrapper
│ │ ├── TraceabilityTimeline/
│ │ ├── AnalyticsDashboard/
│ │ └── ThemeToggle/
│ ├── context/
│ │ └── ThemeContext.jsx
│ ├── hooks/
│ │ └── useQueryApi.js
│ ├── services/
│ │ └── api.js # Axios/Fetch API client
│ └── styles/
│ └── index.css
│
├── database/
│ ├── schema.cypher # Node/relationship constraints & indexes
│ └── seed_data.cypher # Sample farm/batch/shipment data
│
├── docs/
│ ├── AgriChain_AI_Technical_Documentation.md
│ └── screenshots/
│
├── .gitignore
├── LICENSE
└── README.md


---

## 🖼️ Demo Screenshots

> _Screenshots to be added prior to release._

| Chat & Query Interface | Interactive Knowledge Graph |
|--------------------------|--------------------------------|
| `docs/screenshots/chat-interface.png` | `docs/screenshots/knowledge-graph.png` |

| Batch Traceability Timeline | Analytics Dashboard |
|--------------------------------|---------------------------|
| `docs/screenshots/traceability-timeline.png` | `docs/screenshots/analytics-dashboard.png` |

| Light Theme | Dark Theme |
|---------------|--------------|
| `docs/screenshots/light-theme.png` | `docs/screenshots/dark-theme.png` |

---

## 🗺️ Roadmap

- [ ] Multi-language natural language query support
- [ ] Role-based access control (RBAC) for query permissions
- [ ] Export traceability reports as PDF
- [ ] Predictive analytics for supply chain risk scoring

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
