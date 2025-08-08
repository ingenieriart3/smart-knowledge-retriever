const API_BASE = import.meta.env.VITE_API_BASE;

export async function queryNotes(text: string, topK: number = 3) {
  const res = await fetch(`${API_BASE}/api/notes/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, topK }),
  });

  if (!res.ok) throw new Error('Error querying notes');
  return res.json();
}
// export async function createNote(text: string, metadata: any) {
//   const res = await fetch(`${API_BASE}/api/notes`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ text, metadata }),
//   });

//   if (!res.ok) throw new Error('Error creating note');
//   return res.json();
// }
// export async function getAllNotes() {
//   const res = await fetch(`${API_BASE}/api/notes`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (!res.ok) throw new Error('Error fetching notes');
//   return res.json();
// }       