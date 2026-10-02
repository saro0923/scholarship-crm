import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // './' lets the built site work from any sub-path (GitHub Pages, Netlify, etc.)
  base: './',
  server: {
    // Polling makes live-reload reliable inside synced folders such as OneDrive.
    watch: { usePolling: true, interval: 300 },
  },
});
