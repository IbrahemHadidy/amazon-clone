import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@styles': '/src/styles',
      '@services': '/src/services',
      '@features': '/src/app/features',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@app': '/src/app',
      '@interfaces': '/src/interfaces'
    }
  }
});
