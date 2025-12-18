
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This ensures process.env is available in the browser, 
    // which is required by the @google/genai SDK and other logic.
    'process.env': process.env
  },
  build: {
    rollupOptions: {
      // We mark these as external because they are handled by the 
      // importmap in index.html, preventing Rollup from trying to 
      // bundle them from non-existent node_modules.
      external: [
        'react',
        'react-dom',
        'lucide-react',
        'firebase/app',
        'firebase/auth',
        'firebase/firestore',
        'firebase/storage',
        '@google/genai'
      ]
    }
  }
})
