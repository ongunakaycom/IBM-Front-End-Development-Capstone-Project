import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Remove the custom root setting:
  // root: 'public',
  publicDir: 'public', // if you still want a public folder for static assets
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist', // output inside the project folder if desired
    // Remove custom rollupOptions.input unless needed
  },
});