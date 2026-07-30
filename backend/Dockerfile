FROM python:3.10-slim

WORKDIR /app

ENV PYTHONPATH=/app:/app/..

RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir fastapi uvicorn neo4j langchain groq python-dotenv pydantic pytest httpx

COPY . .

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]