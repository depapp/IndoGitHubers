import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), 
    VitePWA({
      srcDir: './src/lib',
      filename: 'sw.js',
      strategies: 'injectManifest',
      injectManifest: {
        swSrc: './src/lib/sw.ts',
      },
      devOptions: {
        enabled: true,
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
