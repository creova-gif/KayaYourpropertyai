import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  retries: 1,
  timeout: 30_000,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'tests/security/report', open: 'never' }],
  ],

  use: {
    baseURL: process.env.KAYA_APP_URL ?? 'http://localhost:5000',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
