import React, { useState } from 'react';

export const SearchBar = ({ onSearch }: { onSearch: (text: string) => void }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Escribí tu consulta..."
        className="border rounded px-3 py-2 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {/* <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Buscar
      </button> */}
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
      >
        🔍 Buscar
      </button>

    </form>
  );
};
