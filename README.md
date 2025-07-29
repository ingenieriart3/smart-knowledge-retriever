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
# 1. Clone the repository and enter the backend
git clone https://github.com/tuusuario/smart-knowledge-retriever.git
cd smart-knowledge-retriever/backend

# 2. Create environment file
cp .env.example .env

# 3. Start services (Weaviate + MongoDB)
docker compose up -d

# 4. Install dependencies and run backend
npm install
npm run dev
