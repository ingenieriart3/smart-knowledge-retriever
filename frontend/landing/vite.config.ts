import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()]
// equal to "dev": "vite dev --port 3001 --host", in the scripts section of package.json
// 	server: {
//     host: '0.0.0.0',
//     port: 5173,
//   }
});
