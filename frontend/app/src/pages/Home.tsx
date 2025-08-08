import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NoteCard from '../components/NoteCard';
import { useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export default function Home() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [mode, setMode] = useState<'embed' | 'query'>('query');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('🧾 Resultados actualizados:', results);
  }, [results]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = `${BASE_URL}/api/notes/${mode === 'embed' ? '' : 'query'}`;

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

    // const payload = {
    //   text,
    //   topK: 3,
    // }; 

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // const data = await res.json();
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} - ${text}`);
      }
      const data = await res.json();
      
      if (mode === 'embed') {
        alert('✅ Nota creada');
        setText('');
        setResults([]);
      } else {
        setResults(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4">🧠 Smart Knowledge Dashboard</h1>

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

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
      >
        {mode === 'embed' ? '📌 Crear' : '🔍 Buscar'}
      </motion.button>

      </form>

      <AnimatePresence mode="wait">
        {mode === 'query' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 space-y-4"
          >
            {loading && <p className="text-blue-500">🔄 Buscando...</p>}
            {results.length > 0 ? (
              <>
                <h3 className="text-xl font-bold">📄 Resultados:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.map((note, i) => (
                    <NoteCard key={i} note={note} />
                  ))}
                </div>
              </>
            ) : !loading && (
              <p className="text-gray-500">No hay resultados aún. Hacé una búsqueda para empezar.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}