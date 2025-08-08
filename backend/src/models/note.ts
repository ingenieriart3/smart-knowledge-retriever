import { Schema, model } from 'mongoose';

const NoteSchema = new Schema(
  {
    _id: { type: String, required: true },
    text: { type: String, required: true },
    metadata: {
      title: String,
      tags: [String],
      source: String,
      created_at: String,
    },
  },
  { timestamps: true }
);

export default model('Note', NoteSchema);
