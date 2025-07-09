import { test, expect } from '@playwright/test';
import { sampleUser } from '../helpers/dataHelpers';

test('Login user', async ({ request }) => {
  const response = await request.get(`/v2/user/login?username=${sampleUser.username}&password=${sampleUser.password}`);
  expect(response.status()).toBe(200);

  const text = await response.text();
  expect(text).toContain('logged in user session');
});
