import { Router } from 'express';
import {
  createNote,
  queryNotes,
  getAllNotes,
  getNoteById,
} from '../controllers/notes';

const router = Router();

router.post('/', createNote);
router.post('/query', queryNotes);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);

export default router;
