import weaviate from 'weaviate-ts-client';

export async function initWeaviateSchema(retries = 5, delay = 3000) {
  const client = weaviate.client({
    scheme: 'http',
    host: process.env.WEAVIATE_URL || 'weaviate:8080',
  });

  for (let i = 0; i < retries; i++) {
    try {
      const existingSchema = await client.schema.getter().do();
      const classExists = existingSchema.classes?.some((c) => c.class === 'Note');

      if (classExists) {
        console.log('[SCHEMA] Clase Note ya existe en Weaviate.');
        return;
      }

      await client.schema
        .classCreator()
        .withClass({
          class: 'Note',
          description: 'Notas embebidas con vector manual',
          vectorizer: 'none',
          vectorIndexType: 'hnsw',
          properties: [
            { name: 'text', dataType: ['text'] },
            { name: 'title', dataType: ['text'] },
            { name: 'source', dataType: ['text'] },
            { name: 'tags', dataType: ['text[]'] },
            { name: 'created_at', dataType: ['date'] },
          ],
        })
        .do();

      console.log('[SCHEMA] Clase Note creada en Weaviate.');
      return;

    } catch (err) {
      console.error(`[SCHEMA RETRY ${i + 1}]`, (err as any).message);
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  throw new Error('No se pudo inicializar el schema en Weaviate luego de varios intentos');
}
