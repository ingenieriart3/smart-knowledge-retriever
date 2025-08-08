<script lang="ts">
  import { onMount } from 'svelte';
  let mounted = false;
  let text = '';
  let result: string | any[] | null = null;
  const API_BASE = import.meta.env.VITE_API_BASE;

  async function handleSubmit() {
    const res = await fetch(`${API_BASE}/api/notes/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    result = await res.json();
  }

  onMount(() => {
    mounted = true;
  });
</script>

<style>
  main {
    max-width: 700px;
    margin: 3rem auto;
    padding: 2rem;
    font-family: system-ui, sans-serif;
    background: #f9f9f9;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.25rem;
  }

  p {
    margin-bottom: 2rem;
    color: #666;
  }

  textarea {
    width: 100%;
    font-size: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    resize: vertical;
  }

  button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }

  button:hover {
    background-color: #005fca;
  }

  ul {
    margin-top: 2rem;
    padding-left: 1rem;
  }

  li {
    margin-bottom: 1rem;
    background: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  }

  li strong {
    display: block;
    font-size: 1.1rem;
    color: #222;
  }

  small {
    color: #888;
    font-size: 0.85rem;
  }

  a {
    display: block;
    margin-top: 2rem;
    text-align: center;
    color: #007aff;
    font-weight: bold;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>

<main>
  <h1>🔍 Smart Knowledge Retriever</h1>
  <p>Explora tus notas por similitud semántica con IA. Una herramienta para mentes creativas.</p>

  <textarea bind:value={text} rows="4" cols="50" placeholder="Proba escribiendo una idea..."></textarea>
  <br />
  <button on:click={handleSubmit}>Buscar</button>

  {#if mounted && result && result.length > 0}
    <h2>Resultados:</h2>
    <ul>
      {#each result as note}
        <li>
          <strong>{note.title}</strong>
          <div>{note.text}</div>
          <small>{note.source} — {note.tags?.join(', ')} — {new Date(note.created_at).toLocaleDateString()}</small>
        </li>
      {/each}
    </ul>
  {/if}

  <a href="http://localhost:3002">→ Ir al dashboard completo</a>
</main>
