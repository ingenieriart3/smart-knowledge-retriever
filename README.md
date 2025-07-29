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
# 1. Clonar el repo y entrar al root
git clone https://github.com/tuusuario/smart-knowledge-retriever.git
cd smart-knowledge-retriever

# 2. Crear .env desde el ejemplo
cp .env.example .env

# 3. Levantar todo
chmod +x dev.sh
./dev.sh
