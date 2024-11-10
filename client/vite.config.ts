import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const backendApiUrl = process.env.BACKEND_API_URL || '';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt', // Permet d'afficher un popup si le sw à été mis à jour

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'], // Fichiers à mettre en cache
      
      clientsClaim: true, // Prend le contrôle des onglets ouverts si le service worker est mis à jour
      
      runtimeCaching: [
        {
          urlPattern: new RegExp(backendApiUrl),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',  // Nom du cache utilisé pour stocker les réponses de l'API
            networkTimeoutSeconds: 10, // Délai maximum de 10 secondes avant de passer au cache si le réseau est lent
            expiration: {
              maxEntries: 5, // Limite de 50 entrées dans le cache
              maxAgeSeconds: 7 * 24 * 60 * 60, // Durée de vie maximale des entrées : 7 jours
            },
            cacheableResponse: {
              statuses: [0, 200] // Accepte les réponses avec un statut 0 ou 200
            }
          },
        }
      ]
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },

  })],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})