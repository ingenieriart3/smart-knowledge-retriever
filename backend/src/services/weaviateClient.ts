import axios from 'axios';
import weaviate from 'weaviate-ts-client';
import OpenAI from 'openai';

const client = weaviate.client({
  scheme: 'http',
  host: process.env.WEAVIATE_URL || 'weaviate:8080',
});

const useManualEmbeddings = process.env.USE_EMBEDDINGS_MANUAL === 'true';
const EMBED_SERVER_URL = process.env.EMBED_SERVER_URL || 'http://embed:8001/embed';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default {
  /**
   * Genera embeddings usando servicio local (si USE_EMBEDDINGS_MANUAL === true).
   */
  async embedText(text: string): Promise<number[] | null> {
    if (!useManualEmbeddings) return null;

    try {
      console.log('[EMBEDDING] Using manual embedding service at', EMBED_SERVER_URL);
      // const res = await axios.post(EMBED_SERVER_URL, { input: text });
      const res = await axios.post(`${EMBED_SERVER_URL}`, {
        text,
      });
      console.log('[EMBEDDING RESPONSE]', res.data)
      if (res.status !== 200) throw new Error('Failed to fetch embedding from local service');

      return res.data.embedding;
    } catch (error) {
      console.error('[EMBED ERROR]', error);
      return null;
    }
  },

  /**
   * Inserta una nota en Weaviate (con o sin vector).
   */
  async upsert(id: string, text: string | number[], metadata = {}) {
    try {
      const creator = client.data
        .creator()
        .withClassName('Note')
        .withId(id)
        .withProperties({
          ...(typeof text === 'string' ? { text } : {}),
          ...metadata,
        });

      if (useManualEmbeddings && Array.isArray(text)) {
        creator.withVector(text);
      }

      await creator.do();
    } catch (error) {
      // console.error('[UPSERT ERROR]', error?.response?.data || error);
      console.error('[UPSERT ERROR]', (error as any)?.response?.data || error);

      throw new Error('Failed to upsert note into Weaviate');
    }
  },

  /**
   * Realiza consulta de notas similares en Weaviate.
   */
  async query(vectorOrText: number[] | string, topK = 3) {
    try {
      const builder = client.graphql
        .get()
        .withClassName('Note')
        .withFields(`
          text
          title
          source
          tags
          created_at
          _additional {
            certainty
          }
        `)
        .withLimit(topK);

      if (useManualEmbeddings && Array.isArray(vectorOrText)) {
        console.log('[WEAVIATE] Using nearVector with manual embedding');
        builder.withNearVector({ vector: vectorOrText });
      } else if (!useManualEmbeddings && typeof vectorOrText === 'string') {
        console.log('[WEAVIATE] Using nearText');
        builder.withNearText({ concepts: [vectorOrText] });
      } else {
        throw new Error('Invalid query input or config');
      }

      const result = await builder.do();
      return result.data.Get.Note;
    } catch (error) {
      // console.error('[QUERY ERROR]', error?.response?.data || error);
      console.error('[UPSERT ERROR]', (error as any)?.response?.data || error);

      throw new Error('Failed to query Weaviate');
    }
  },
};
