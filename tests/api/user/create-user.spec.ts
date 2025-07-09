import { test, expect } from '@playwright/test';
import { sampleUser } from '../helpers/dataHelpers';

test('Create a new user', async ({ request }) => {
  const response = await request.post('/v2/user', { data: sampleUser });
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.message).toBe(String(sampleUser.id));
});
