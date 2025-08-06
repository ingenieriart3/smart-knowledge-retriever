import weaviate from 'weaviate-ts-client';
import OpenAI from 'openai';

const client = weaviate.client({
  scheme: 'http',
  host: process.env.WEAVIATE_URL || 'weaviate:8080',
});

const useManualEmbeddings = process.env.USE_EMBEDDINGS_MANUAL === 'true';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default {
  async embedText(text: string): Promise<number[] | null> {
    if (!useManualEmbeddings) return null;

    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small', // o el que prefieras
      input: text,
    });

    return response.data[0].embedding;
  },

  async upsert(id: string, text: string | number[], metadata = {}) {
    const creator = client.data.creator().withClassName('Note').withId(id).withProperties({
      ...(typeof text === 'string' ? { text } : {}), // si es string, la guardamos también como texto
      ...metadata,
    });

    if (useManualEmbeddings && Array.isArray(text)) {
      creator.withVector(text); // solo si es un vector manual
    }

    await creator.do();
  },

  async query(text: string, topK = 3) {
    const query = client.graphql.get().withClassName('Note').withFields('text _additional {certainty}').withLimit(topK);

    if (useManualEmbeddings) {
      const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
      });

      query.withNearVector({ vector: embedding.data[0].embedding });
    } else {
      query.withNearText({ concepts: [text] });
    }

    const result = await query.do();
    return result.data.Get.Note;
  },
};
