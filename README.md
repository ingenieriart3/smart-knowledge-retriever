# 🧠 Smart Knowledge Retriever

> Store ideas. Search semantically. Stay sharp.

**Smart Knowledge Retriever** is an AI-powered knowledge management tool for developers and technical teams.  
It bridges traditional CRUD storage with modern vector search, combining the power of semantic embeddings and structured data in one modular, extensible stack.

Designed to boost your memory, empower your workflows, and grow with your projects.

**🛠️ Open Source. Plug & Play. Developer-first.**

---

## 🚀 Tech Stack

- **Backend**: Node.js + Express + TypeScript  
- **Frontend**: React (Dashboard) + SvelteKit (Landing)  
- **Database**: MongoDB  
- **Vector DB**: Weaviate (dev via Docker) / Pinecone (prod-ready)  
- **Embeddings**: OpenAI API or local embedding service (`/embed`)  
- **Infra**: Docker Compose, CI-ready, portable

---

## ⚡ Key Features

- 📝 **CRUD for Notes** — manage structured metadata and content  
- 📐 **Embeddings** — generate vectors via OpenAI or local model  
- 🔍 **Semantic Search** — fast, contextual search across notes  
- 🧠 **Unified Abstraction Layer** — switch vector DBs seamlessly  
- 🌱 **Seeder** — populate your DB with examples in seconds  
- 🧰 **Modular Design** — ideal for hacking, integrating or extending

---

## 🧪 Local Development

```bash
# Clone repo
git clone https://github.com/ingenieriart3/smart-knowledge-retriever.git
cd smart-knowledge-retriever

# Setup env
cp .env.example .env

# Start full dev stack
chmod +x dev.sh
./dev.sh all

🔧 Or run individually:

./dev.sh backend    # API only
./dev.sh app        # React dashboard
./dev.sh landing    # Svelte landing
./dev.sh clean      # Stop & clean all

🌱 Optional: Seeder

docker exec -it smart-knowledge-retriever-backend-1 sh
npx ts-node src/seeder.ts

Supports both OpenAI embeddings and local model (USE_EMBEDDINGS_MANUAL=true).
🔗 Local Access Points
Service	URL
🧠 Express API	http://localhost:3000
🎯 Svelte Landing	http://localhost:3001
📊 React Dashboard	http://localhost:3002
🗃️ MongoDB	mongodb://localhost:27017
📡 Weaviate Console	http://localhost:8080
🤖 Embedding Server	http://localhost:8001/embed
✨ Use Cases

    🧠 Second brain for devs and teams

    📚 Semantic search for documentation

    💬 RAG pipelines for AI assistants

    🔍 Context engine for notes and ideas

    🧾 Literature and research exploration

💡 Dev Tips
Expose SvelteKit in package.json

"dev": "vite dev --port 3001 --host"

Docker port mapping

ports:
  - "3001:3001"

Optional Healthcheck

healthcheck:
  test: ["CMD-SHELL", "wget --spider -q http://localhost:3001 || exit 1"]
  interval: 10s
  timeout: 5s
  retries: 3

Clean dangling containers

docker container prune

📄 Docs & Contributions

Contributors are welcome!
Create a /docs/dev.md with your notes, startup tips, or ideas.
🪪 License

MIT License — free for personal and commercial use.
Use it, fork it, build something cool — and tag us if you do!

Made with 🧠 by @ingenieriart3
