import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',  // Dossier source de ton projet
    filename: 'sw.ts',
    
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },
    
    manifest: {
      name: 'carnet-voyage',
      short_name: 'carnet-voyage',
      description: 'carnet-voyage',
      theme_color: '#ffffff',
    },

    devOptions: {
      enabled: true
    },
    
  })],

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})