import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,         // Use global functions like describe, it, expect without importing them
    environment: 'node',    // NestJS runs in a Node.js environment
    setupFiles: './test/setup.ts', // Optionally, setup before running tests\
    include: ['src/**/*.spec.ts'], // Points to the test files
  },
});