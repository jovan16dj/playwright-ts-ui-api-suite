// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,
  retries: 0,
  testDir: './tests',
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'UI Tests',
      testMatch: /.*ui\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://opensource-demo.orangehrmlive.com',
      },
    },
    {
      name: 'API Tests',
      testMatch: /.*api\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://petstore.swagger.io',
      },
    },
  ],
});
