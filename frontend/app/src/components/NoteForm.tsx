import React, { useState } from 'react';
import NoteCard from './NoteCard';

function NoteForm() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [mode, setMode] = useState<'embed' | 'query'>('embed');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = mode === 'embed' ? '/api/notes/embed' : '/api/notes/query';
    const payload = mode === 'embed'
      ? {
          text,
          metadata: {
            title: 'Desde frontend',
            source: 'form',
            tags: ['demo'],
            created_at: new Date().toISOString(),
          },
        }
      : { text, topK: 3 };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (mode === 'embed') {
      alert('Nota creada');
      setText('');
      setResults([]);
    } else {
      setResults(data.results || []);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <textarea
          rows={4}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="✍️ Escribí tu nota o consulta..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="embed"
              checked={mode === 'embed'}
              onChange={() => setMode('embed')}
            />
            <span>📌 Crear nota</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="query"
              checked={mode === 'query'}
              onChange={() => setMode('query')}
            />
            <span>🔎 Buscar notas</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {mode === 'embed' ? 'Crear' : 'Buscar'}
        </button>
      </form>

      {mode === 'query' && results.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold">📄 Resultados:</h3>
          <ul className="space-y-4">
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold">📄 Resultados:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((note, i) => (
                  <NoteCard key={i} note={note} />
                ))}
              </div>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NoteForm;
