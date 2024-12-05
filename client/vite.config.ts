import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt', // Permet d'afficher un popup si le sw à été mis à jour
    strategies: 'injectManifest',
    
    injectManifest: {
      swSrc: path.resolve(__dirname, 'src/sw.ts'),
      swDest: 'sw.js',
    },
    
    manifest: {
      name: 'carnet-voyage',
      short_name: 'carnet-voyage',
      description: 'carnet-voyage',
      theme_color: '#ffffff',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      runtimeCaching: [{
        urlPattern: new RegExp(`^${process.env.API_URL}/?.*`),
        handler: "NetworkFirst",
        options: {
          cacheName: 'api-responses-caches',
          expiration: {
            maxEntries: 1,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }]
    },

    devOptions: {
      enabled: true
    },
    
  })],

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})