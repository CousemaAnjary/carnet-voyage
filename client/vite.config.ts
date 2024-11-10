import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt', // Permet d'afficher un popup si le sw à été mis à jour

    strategies: 'injectManifest',
    srcDir: 'src',  // Dossier source de ton projet
    filename: 'sw.ts',
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg}'],  // Spécifie les fichiers à inclure dans le manifest
    },

    workbox: { 
      clientsClaim: true, // Prend le contrôle des onglets ouverts si le service worker est mis à jour
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