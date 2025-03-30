import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  publicDir: 'public', // if you still want a public folder for static assets
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' } // treat .js files as JSX during dependency optimization
    }
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist', // output inside the project folder if desired
  },
});