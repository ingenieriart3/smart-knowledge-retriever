import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import notesRoutes from './routes/notes';
import { initWeaviateSchema } from './utils/initWeaviateSchema';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/smart-notes';

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_, res) => {
  res.send('✅ Smart Knowledge Retriever API is running');
});

// Routes
app.use('/api/notes', notesRoutes);

// MongoDB connection with retry
async function connectToMongo() {
  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('✅ Connected to MongoDB');
      return;
    } catch (err) {
      attempt++;
      console.error(`❌ MongoDB connection attempt ${attempt} failed. Retrying in 5s...`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  console.error('❌ Could not connect to MongoDB after multiple attempts. Exiting...');
  process.exit(1);
}

// Init
connectToMongo().then(async () => {
  try {
    // await initWeaviateSchema(); // <-- inicializa la clase "Note" en Weaviate si no existe
  } catch (error) {
    console.error('⚠️ Error al inicializar el schema de Weaviate:', error);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
});
