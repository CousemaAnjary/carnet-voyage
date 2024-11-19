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

    manifest: {
      name: 'carnet-voyage',
      short_name: 'carnet-voyage',
      description: 'carnet-voyage',
      theme_color: '#ffffff',
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: false,
    },

  })],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})