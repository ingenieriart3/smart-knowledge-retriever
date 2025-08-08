import mongoose from 'mongoose';
import dotenv from 'dotenv';
import vectorClient from './services/vectorClient';
import NoteModel from './models/note';
import { initWeaviateSchema } from './utils/initWeaviateSchema';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/smart-notes';

const seedData = [
  {
    id: uuidv4(),
    text: 'Este es un ejemplo de nota sobre embeddings y vectores.',
    metadata: {
      title: 'Embeddings con Weaviate',
      source: 'seed',
      tags: ['vector', 'weaviate'],
      created_at: new Date('2025-08-07T00:00:00Z'),
    },
  },
  {
    id: uuidv4(),
    text: 'La inteligencia artificial puede buscar textos similares usando vectores.',
    metadata: {
      title: 'Búsqueda semántica',
      source: 'seed',
      tags: ['AI', 'semántica'],
      created_at: new Date('2025-08-06T00:00:00Z'),
    },
  },
  {
    id: uuidv4(),
    text: 'MongoDB almacena las notas mientras Weaviate gestiona la búsqueda por similitud.',
    metadata: {
      title: 'Arquitectura híbrida',
      source: 'seed',
      tags: ['MongoDB', 'Weaviate'],
      created_at: new Date('2025-08-05T00:00:00Z'),
    },
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    await initWeaviateSchema();
    console.log('✅ Esquema de Weaviate inicializado');

    for (const note of seedData) {
      const embedding = await vectorClient.embedText(note.text);
      if (!embedding) throw new Error('❌ No se pudo generar el embedding');

      await vectorClient.upsert(note.id, embedding, note.metadata);
      await NoteModel.create({ _id: note.id, text: note.text, metadata: note.metadata });

      console.log(`✅ Nota '${note.metadata.title}' creada`);
    }

    console.log('🌱 Seed completado con éxito');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error durante el seed:', err);
    process.exit(1);
  }
}

seed();
