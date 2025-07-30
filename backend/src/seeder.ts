// npx ts-node src/seeder.ts

import dotenv from 'dotenv';
import vectorClient from './services/vectorClient';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const notes = [
  {
    id: uuidv4(),
    text: 'To connect a DHT22 temperature and humidity sensor to an ESP32, use GPIO pin 13 with a 10k pull-up resistor on the data line. Read values every 2 seconds to avoid saturation.',
    metadata: {
      title: 'ESP32 + DHT22 wiring tip',
      tags: ['esp32', 'sensor', 'dht22', 'iot', 'hardware'],
      source: 'growhardware docs',
      created_at: '2025-07-28T18:45:00Z',
    },
  },
  {
    id: uuidv4(),
    text: 'To create a MongoDB dump for backup, use `mongodump --uri=<your-uri> --out=./backup`. Restore with `mongorestore`.',
    metadata: {
      title: 'MongoDB backup & restore tip',
      tags: ['mongodb', 'backup', 'cli', 'devops'],
      source: 'cli notes',
      created_at: '2025-07-28T19:00:00Z',
    },
  },
  {
    id: uuidv4(),
    text: 'OpenAI provides embedding models like text-embedding-3-small to convert text into high-dimensional vectors. These vectors can be stored and searched using vector databases like Pinecone or Weaviate.',
    metadata: {
      title: 'Embedding basics with OpenAI',
      tags: ['openai', 'embeddings', 'vector', 'ai'],
      source: 'embedding docs',
      created_at: '2025-07-28T19:30:00Z',
    },
  },
  {
    id: uuidv4(),
    text: 'In this project, Weaviate is used as the local vector database for development via Docker Compose, allowing for rapid iteration and full offline testing. Pinecone is used in production as a scalable, fully managed service. The code is structured to dynamically select the backend provider using a VECTOR_PROVIDER env variable. Query and upsert methods are normalized across both clients.',
    metadata: {
      title: 'Hybrid vector DB strategy: Weaviate (dev) + Pinecone (prod)',
      tags: ['weaviate', 'pinecone', 'ai', 'architecture', 'embedding', 'strategy'],
      source: 'internal architecture decision',
      created_at: '2025-07-29T00:00:00Z',
    },
  },
  {
    id: uuidv4(),
    text: 'When building an API with Node.js and TypeScript, use ts-node-dev for live reload in development and separate build/start scripts for production.',
    metadata: {
      title: 'Node + TypeScript API setup tip',
      tags: ['nodejs', 'typescript', 'api', 'devtools'],
      source: 'backend setup',
      created_at: '2025-07-28T20:15:00Z',
    },
  },
];

async function seedNotes() {
  for (const note of notes) {
    try {
      const vector = await vectorClient.embedText?.(note.text);

      if (vector) {
        await vectorClient.upsert(note.id, vector, note.metadata);
      } else {
        // For Weaviate: use raw text
        await vectorClient.upsert(note.id, note.text, note.metadata);
      }

      console.log(`✅ Seeded: ${note.metadata.title}`);
    } catch (error) {
      console.error(`❌ Error seeding ${note.id}:`, error);
    }
  }
}

seedNotes().then(() => {
  console.log('✨ Seeder completed.');
});
