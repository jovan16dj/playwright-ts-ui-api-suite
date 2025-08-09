import { defineConfig, devices } from '@playwright/test';
import 'tsconfig-paths/register';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  timeout: 45_000,
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
