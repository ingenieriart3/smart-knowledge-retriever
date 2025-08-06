# 🧠 Smart Knowledge Retriever

> Store ideas. Search semantically. Decide smart.

**Smart Knowledge Retriever** is an intelligent knowledge and idea management tool that combines semantic search, embeddings, and AI recommendations.  
Built with **TypeScript**, **Node.js**, **MongoDB**, **React**, **Svelte**, **OpenAI**, and **Pinecone/Weaviate**, it showcases a modern full-stack architecture that bridges traditional CRUD operations with advanced vector search capabilities.  
Designed for developers, technical teams, and power users, it helps you store, explore, and retrieve valuable insights — faster and smarter.

---

## 🚀 Tech Stack

- **Backend**: Node.js + Express + TypeScript  
- **Frontend**: React + SvelteKit (landing + dashboard)  
- **Database**: MongoDB  
- **Vector DB**: Pinecone (prod) / Weaviate (dev, Docker)  
- **AI Provider**: OpenAI embeddings API  
- **Infra**: Docker Compose, CI-ready  

---

## 🧪 Local Development Setup

```bash
# 1. Clone the repository and enter root
git clone https://github.com/tuusuario/smart-knowledge-retriever.git
cd smart-knowledge-retriever

# 2. Create .env from the example
cp .env.example .env

# 3. Lift 
chmod +x dev.sh
./dev.sh all → lift everything (or default ./dev.sh )

./dev.sh backend → lift the backend

./dev.sh app → lift the react app

./dev.sh landing → lift the svelte landing

./dev.sh clean → stop everything and delete 
  # seeder
  docker exec -it smart-knowledge-retriever-backend-1 sh > npx ts-node src/seeder.ts

# 4. Access
🧠 API Express      → http://localhost:3000
🎯 Svelte Landing   → http://localhost:3001
🔧 React Dashboard  → http://localhost:3002
🗃️ MongoDB UI       → http://localhost:27017
📊 Weaviate Console → http://localhost:8080
---

# 5. ⚡ Bonus: Value pitch for the demo

Smart Knowledge Retriever is a hybrid memory engine that stores both structured and vectorized knowledge. It allows ingesting notes or documents, vectorizes them using OpenAI embeddings via Weaviate, and supports intelligent querying based on semantic similarity.

This architecture is designed to scale across use cases like:

    Personal second brain

    Company documentation search

    Embedded AI assistants
---

## 🔧 Improvements / Dev Notes

- ✅ Add `--host` to Svelte dev script to allow external access from Docker:

  ```json
  "dev": "vite dev --port 3001 --host"
  ```

- 💡 Tip: expose the port in `docker-compose.yml`:

  ```yaml
  ports:
    - "3001:3001"
  ```

- 🧪 Optional: add a healthcheck for the landing service:

  ```yaml
  healthcheck:
    test: ["CMD-SHELL", "wget --spider -q http://localhost:3001 || exit 1"]
    interval: 10s
    timeout: 5s
    retries: 3
  ```

- 🔍 Consider documenting startup scripts per service in `/docs/dev.md` (optional).

- 🧼 Cleanup dangling containers (from `docker compose run`):

  ```bash
  docker container prune
  ```

