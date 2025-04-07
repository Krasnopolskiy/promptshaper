import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Server configuration
const serverConfig = {
  host: '::',
  port: 8080,
};

// Resolve configuration
const resolveConfig = {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
};

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: '',
  server: serverConfig,
  plugins: [react()].filter(Boolean),
  resolve: resolveConfig,
}));
