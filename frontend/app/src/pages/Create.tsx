import { useState } from 'react';
import { createNote, queryNotes } from '../api';

export default function Create() {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);

  const handleCreate = async () => {
    await createNote({ text, metadata: { title: 'Desde frontend', source: 'UI', tags: ['demo'], created_at: new Date().toISOString() } });
    alert('Nota creada');
  };

  const handleQuery = async () => {
    const res = await queryNotes({ text });
    setResults(res.data);
  };

  return (
    <div>
      <h2>Crear / Buscar Notas</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} cols={40} />
      <br />
      <button onClick={handleCreate}>Crear</button>
      <button onClick={handleQuery}>Buscar</button>

      {results.length > 0 && (
        <>
          <h3>Resultados:</h3>
          <ul>
            {results.map((note: any, i: number) => (
              <li key={i}>
                <strong>{note.title}</strong>: {note.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
