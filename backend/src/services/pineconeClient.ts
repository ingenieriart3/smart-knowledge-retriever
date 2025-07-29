import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAI } from 'openai';

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME || 'notes');

export default {
  async embedText(text: string) {
    const res = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return res.data[0].embedding;
  },

  async upsert(id: string, vector: number[], metadata = {}) {
    await index.upsert([{ id, values: vector, metadata }]);
  },

  async query(vector: number[], topK = 3) {
    return await index.query({
      vector,
      topK,
      includeMetadata: true,
    });
  },
};
