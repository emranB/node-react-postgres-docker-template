import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './src', // Ensure root points to src for Vite to locate index.html
  build: {
    outDir: '../dist', // Output outside of src
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: '0.0.0.0', // Make accessible within Docker
  },
});
