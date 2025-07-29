import express from 'express';
import dotenv from 'dotenv';
import vectorClient from './services/vectorClient';
import {
  normalizePineconeResults,
  normalizeWeaviateResults,
} from './utils/normalizeResults';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/', (_, res) => {
  res.send('Smart Knowledge Retriever API is running');
});

// POST /embed
app.post('/api/embed', async (req, res) => {
  const { id, text, metadata } = req.body;

  try {
    const vector = await vectorClient.embedText(text);
    if (vector) {
      await vectorClient.upsert(id, vector, metadata);
    } else {
      // Caso Weaviate: upsert con texto directo
      await vectorClient.upsert(id, text, metadata);
    }
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Embedding/upsert failed' });
  }
});

// POST /query
app.post('/api/query', async (req, res) => {
  const { text, topK } = req.body;

  try {
    const vector = await vectorClient.embedText?.(text);
    const raw = await vectorClient.query(vector ?? text, topK || 3);

    const results =
      process.env.VECTOR_PROVIDER === 'pinecone'
        ? normalizePineconeResults(raw.matches || raw)
        : normalizeWeaviateResults(raw);

    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Query failed' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
