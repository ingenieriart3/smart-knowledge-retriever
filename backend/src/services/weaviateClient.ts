import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  // host: process.env.WEAVIATE_URL || 'weaviate:8080',
  host: process.env.WEAVIATE_URL || 'localhost:8080',
});

export default {
  async embedText(text: string) {
    // when using text2vec-openai, Weaviate do itself on creating
    return null; // No manual embed required
  },

  async upsert(id: string, text: string | number[] , metadata = {}) {
    await client.data
      .creator()
      .withClassName('Note')
      .withId(id)
      .withProperties({ text, ...metadata })
      .do();
  },

  async query(text: string, topK = 3) {
    const result = await client.graphql
      .get()
      .withClassName('Note')
      .withFields('text _additional {certainty}')
      .withNearText({ concepts: [text] })
      .withLimit(topK)
      .do();

    return result.data.Get.Note;
  },
};
