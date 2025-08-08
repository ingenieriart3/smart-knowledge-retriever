import axios from 'axios';

const API_BASE = '/api/notes';

export const getAllNotes = () => axios.get(API_BASE);
export const createNote = (data: any) => axios.post(`${API_BASE}/embed`, data);
export const queryNotes = (data: any) => axios.post(`${API_BASE}/query`, data);
