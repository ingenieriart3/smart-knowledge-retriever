import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAI } from 'openai';

const pineconeApiKey = process.env.PINECONE_API_KEY;
if (!pineconeApiKey) {
  throw new Error('PINECONE_API_KEY environment variable is not set');
}
const pinecone = new Pinecone({ apiKey: pineconeApiKey });
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

  async upsert(id: string, vectorOrText: number[] | string, metadata = {}) {
    let vector: number[];
    if (typeof vectorOrText === 'string') {
      vector = await this.embedText(vectorOrText);
    } else {
      vector = vectorOrText;
    }
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
