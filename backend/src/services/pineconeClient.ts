import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAI } from 'openai';

const pineconeApiKey = process.env.PINECONE_API_KEY;
if (!pineconeApiKey) throw new Error('PINECONE_API_KEY environment variable is not set');

const pinecone = new Pinecone({ apiKey: pineconeApiKey });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const index = pinecone.Index(process.env.PINECONE_INDEX_NAME || 'notes');
const useManualEmbeddings = process.env.USE_EMBEDDINGS_MANUAL === 'true';

export default {
  async embedText(text: string): Promise<number[] | null> {
    if (!useManualEmbeddings) return null;

    const res = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return res.data[0].embedding;
  },

  async upsert(id: string, vectorOrText: number[] | string, metadata = {}) {
    let vector: number[];

    if (typeof vectorOrText === 'string') {
      if (!useManualEmbeddings) {
        throw new Error('USE_EMBEDDINGS_MANUAL=false but text was passed to upsert');
      }
      vector = await this.embedText(vectorOrText) as number[];
    } else {
      vector = vectorOrText;
    }

    await index.upsert([{ id, values: vector, metadata }]);
  },

  async query(input: string | number[], topK = 3) {
    let vector: number[];

    if (typeof input === 'string') {
      if (!useManualEmbeddings) {
        throw new Error('USE_EMBEDDINGS_MANUAL=false but string query was provided');
      }

      const res = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input,
      });

      vector = res.data[0].embedding;
    } else {
      vector = input;
    }

    const result = await index.query({
      vector,
      topK,
      includeMetadata: true,
    });

    return result.matches;
  },
};
