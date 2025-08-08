import { Request, Response } from 'express';
import vectorClient from '../services/vectorClient';
import NoteModel from '../models/note';
import mongoose from 'mongoose';
// import { query as queryWeaviate } from '../services/weaviateClient';
import weaviateClient from '../services/weaviateClient';


import {
  normalizePineconeResults,
  normalizeWeaviateResults,
} from '../utils/normalizeResults';

export const createNote = async (req: Request, res: Response) => {
  const { id = crypto.randomUUID(), text, metadata } = req.body;

  if (!text) return res.status(400).json({ error: 'Missing text' });

  try {
    const vector = await weaviateClient.embedText(text);
    // const vector = await vectorClient.embedText?.(text);

    if (vector) {
      // await vectorClient.upsert(id, vector, metadata);
      await weaviateClient.upsert(id, vector, metadata);
    } else {
      await weaviateClient.upsert(id, text, metadata);
      // await vectorClient.upsert(id, text, metadata);
    }

    const newNote = await NoteModel.create({ _id: id, text, metadata });
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create note' });
  }
};


export const getAllNotes = async (_req: Request, res: Response) => {
  try {
    const notes = await NoteModel.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

// export const getNoteById = async (req: Request, res: Response) => {
//   try {
//     const note = await NoteModel.findById(req.params.id);
//     if (!note) return res.status(404).json({ error: 'Note not found' });

//     res.json(note);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch note' });
//   }
// };

export const queryNotes = async (req: Request, res: Response) => {
  try {
    const { text, topK } = req.body;
    console.log('[QUERY]', { text, topK });

    const useManual = process.env.USE_EMBEDDINGS_MANUAL === 'true';

    const vectorOrText = useManual
      ? await weaviateClient.embedText(text)
      : text;

    if (!vectorOrText) {
      return res.status(400).json({ error: 'No vector/text to query' });
    }

    const results = await weaviateClient.query(vectorOrText, topK || 3);
    res.json(results);
  } catch (error) {
    console.error('[QUERY ERROR]', error);
    res.status(500).json({ error: 'Failed to query notes' });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const note = await NoteModel.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
};
