// import React from 'react';

// interface NoteCardProps {
//   note: {
//     title?: string;
//     text?: string | null;
//     source?: string;
//     tags?: string[];
//     created_at?: string;
//     _additional?: {
//       certainty?: number;
//     };
//   };
// }

// const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
//   const {
//     title,
//     text,
//     source,
//     tags,
//     created_at,
//     _additional,
//   } = note;

//   return (
//     <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
//       <div className="flex justify-between items-center mb-2">
//         <strong className="text-lg text-blue-700">
//           {title || 'Sin título'}
//         </strong>
//         {_additional?.certainty && (
//           <span className="text-xs text-gray-400">
//             Confianza: {(100 * _additional.certainty).toFixed(1)}%
//           </span>
//         )}
//       </div>

//       <p className="text-gray-800">
//         {text ?? <span className="text-gray-400 italic">Sin contenido textual.</span>}
//       </p>

//       <div className="mt-3 text-sm text-gray-500 space-y-1">
//         {source && <p>📁 Fuente: {source}</p>}
//         {tags?.length > 0 && <p>🏷️ Tags: {tags.join(', ')}</p>}
//         {created_at && (
//           <p>🕓 Fecha: {new Date(created_at).toLocaleString()}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NoteCard;

import React from 'react';

interface NoteCardProps {
  note: {
    title?: string;
    text?: string | null;
    source?: string;
    tags?: string[];
    created_at?: string;
    _additional?: {
      certainty?: number;
    };
  };
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <strong className="text-lg text-blue-700">
          {note.title || 'Sin título'}
        </strong>
        {note._additional?.certainty && (
          <span className="text-xs text-gray-400">
            Confianza: {(note._additional.certainty * 100).toFixed(1)}%
          </span>
        )}
      </div>

      <p className="text-gray-800">
        {note.text ?? <span className="text-gray-400 italic">Sin contenido textual.</span>}
      </p>

      <div className="mt-3 text-sm text-gray-500 space-y-1">
        {note.source && <p>📁 Fuente: {note.source}</p>}
        {note.tags?.length ? <p>🏷️ Tags: {note.tags.join(', ')}</p> : null}
        {note.created_at && (
          <p>🕓 Fecha: {new Date(note.created_at).toLocaleString()}</p>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
