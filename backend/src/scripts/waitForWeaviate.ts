import fetch from 'node-fetch';

const url = 'http://weaviate:8080/v1/.well-known/ready';

async function waitForWeaviate(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        console.log('✅ Weaviate is ready');
        return;
      }
    } catch (err) {
      console.log(`⏳ Esperando Weaviate... (${i + 1})`);
    }
    await new Promise((r) => setTimeout(r, delay));
  }

  throw new Error('❌ Weaviate no está disponible luego de varios intentos.');
}

waitForWeaviate();
