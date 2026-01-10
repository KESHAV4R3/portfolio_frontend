import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    // Remove historyApiFallback as it's not a valid Vite option
  },
  // Add this for proper SPA fallback in production
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});