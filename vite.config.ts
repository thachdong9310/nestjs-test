import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

export default defineConfig({
  test: {
    globals: true, // Allows global test variables like `describe` and `it`
    environment: 'node', // Set the environment to node for backend testing
    coverage: {
      reporter: ['text', 'json', 'html'], // Coverage output formats
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for src directory, if needed
    },
  },
});