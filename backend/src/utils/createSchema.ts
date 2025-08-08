// scripts/createSchema.ts

import weaviate from 'weaviate-ts-client';
import dotenv from 'dotenv';

dotenv.config();

async function createSchema() {
  const client = weaviate.client({
    scheme: 'http',
    host: process.env.WEAVIATE_URL || 'weaviate:8080',
  });

  try {
    const existingSchema = await client.schema.getter().do();
    const classExists = existingSchema.classes?.some((c) => c.class === 'Note');

    if (classExists) {
      console.log('✅ La clase Note ya existe en Weaviate.');
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

    console.log('✅ Clase Note creada correctamente en Weaviate.');
  } catch (err) {
    console.error('❌ Error al crear la clase en Weaviate:', err);
    process.exit(1);
  }
}

createSchema();
