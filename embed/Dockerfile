# Dockerfile - servicio de embeddings local

FROM python:3.10-slim

WORKDIR /app

RUN pip install fastapi uvicorn sentence-transformers

COPY embedding_service.py .

CMD ["uvicorn", "embedding_service:app", "--host", "0.0.0.0", "--port", "8001"]
