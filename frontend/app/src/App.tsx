// // // frontend/app/App.tsx
// // import React from 'react';

// // function App() {
// //   return (
// //     <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
// //       <h1>📚 Smart Knowledge Retriever</h1>
// //       <p>This is the dashboard (React + Vite).</p>
// //     </div>
// //   );
// // }

// // export default App;

// // import React from 'react';
// // import NoteForm from './components/NoteForm';

// // function App() {
// //   return (
// //     <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
// //       <h1>📘 Smart Knowledge Retriever</h1>
// //       <NoteForm />
// //     </div>
// //   );
// // }

// // export default App;


// // import React from 'react';
// // import ReactDOM from 'react-dom/client';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import App from './App';
// // import Home from './pages/Home';
// // import Create from './pages/Create';

// // ReactDOM.createRoot(document.getElementById('root')!).render(
// //   <BrowserRouter>
// //     <Routes>
// //       <Route path="/" element={<App />}>
// //         <Route index element={<Home />} />
// //         <Route path="/create" element={<Create />} />
// //       </Route>
// //     </Routes>
// //   </BrowserRouter>
// // );

// import { Outlet, Link } from 'react-router-dom';

// export default function App() {
//   return (
//     <div>
//       <nav>
//         <Link to="/">Todas las notas</Link> | <Link to="/create">Crear/Buscar</Link>
//       </nav>
//       <hr />
//       <Outlet />
//     </div>
//   );
// }

import './App.css'
import Home from './pages/Home';

function App() {
  return <Home />;
}

export default App;
