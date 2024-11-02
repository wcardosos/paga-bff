import { defineConfig } from 'vitest/config';
import { config } from 'dotenv';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    include: ['./tests/e2e/**/*.e2e.spec.ts'],
    globals: true,
    setupFiles: ['./tests/e2e/setup.ts'],
    env: {
      ...config({ path: '.env' }).parsed,
    },
  },
});
