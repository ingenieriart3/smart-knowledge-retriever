# 🧠 Smart Knowledge Retriever

> Store ideas. Search semantically. Stay sharp.

**Smart Knowledge Retriever** is an intelligent knowledge and idea management tool that combines semantic search, vector embeddings, and AI-powered insights.  
It bridges traditional CRUD storage with modern vector databases, giving you fast and accurate access to your thoughts, notes, and technical concepts.

Designed for developers, technical teams, and curious minds.  
**Open Source, modular, extensible.**

---

## 🚀 Tech Stack

- **Backend**: Node.js + Express + TypeScript  
- **Frontend**: React (dashboard) + SvelteKit (landing)  
- **Database**: MongoDB  
- **Vector DB**: Weaviate (dev, Docker) / Pinecone (prod)  
- **Embeddings**: OpenAI API or local service (`/embed`) with `text-embedding-3-small`  
- **Infra**: Docker Compose, CI-ready  

---

## ⚡ Features

- 📝 Classic CRUD for notes and metadata  
- 📐 Embedding generation via OpenAI or local service  
- 🔍 Semantic search using Weaviate or Pinecone  
- 🧠 Unified abstraction for vector providers (`vectorClient`)  
- 🌍 Modern full-stack: TypeScript, MongoDB, Embeddings, Docker, Developer-first

---

## 🧪 Local Development Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/smart-knowledge-retriever.git
cd smart-knowledge-retriever

# 2. Create your environment file
cp .env.example .env

# 3. Start development environment
chmod +x dev.sh

# Lift all services (backend + embed + frontend + db + weaviate)
./dev.sh all         

# Or individually:
./dev.sh backend     # lift backend only
./dev.sh app         # React dashboard
./dev.sh landing     # Svelte landing
./dev.sh clean       # stop & clean all containers and volumes

🌱 Seeder (Optional)

After all services are up, you can prefill the vector DB with example notes:

# Run inside the backend container
docker exec -it smart-knowledge-retriever-backend-1 sh
npx ts-node src/seeder.ts

Seeder will attempt to embed the text with embedText (OpenAI or local).
If using USE_EMBEDDINGS_MANUAL=true, it will skip API calls and use the /embed service.
🔗 Local Access Points
Service	URL
🧠 Express API	http://localhost:3000
🎯 Svelte Landing	http://localhost:3001
🔧 React Dashboard	http://localhost:3002
🗃️ MongoDB	mongodb://localhost:27017
📊 Weaviate Console	http://localhost:8080
🤖 Embedding Server	http://localhost:8001/embed
✨ Pitch This Demo

    Smart Knowledge Retriever is a hybrid memory engine.
    It stores knowledge both as structured data (MongoDB) and semantic vectors (Weaviate/Pinecone), enabling intelligent querying with natural language.

It’s perfect for:

    🧠 Personal second brains

    📚 AI-enhanced documentation search

    💬 AI assistant RAG pipelines

    🔍 Developer notes + context

    🧾 Research and literature insights

🧰 Dev Tips & Good Practices

    ✅ Enable external access for Svelte in package.json:

"dev": "vite dev --port 3001 --host"

🔍 Don't forget to expose ports in docker-compose.yml:

ports:
  - "3001:3001"

🔄 Optional healthcheck for Svelte:

healthcheck:
  test: ["CMD-SHELL", "wget --spider -q http://localhost:3001 || exit 1"]
  interval: 10s
  timeout: 5s
  retries: 3

🧼 Clean up dangling containers:

    docker container prune

    📄 Add service startup notes to /docs/dev.md (optional but helpful for contributors)

🪪 License

MIT License – free for personal and commercial use.
Use it, fork it, improve it — and tag us if you build something cool.

Made with 🧠 by ingenieriart3