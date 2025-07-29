#!/bin/bash

echo "🧠 Starting Smart Knowledge Retriever (dev mode)..."

cp .env.example .env 2>/dev/null

docker compose up --build
