import { test, expect } from '@playwright/test';

test('Get store inventory', async ({ request }) => {
  const response = await request.get('/v2/store/inventory');
  expect(response.status()).toBe(200);

  const inventory = await response.json();
  expect(inventory).toBeTruthy();
  expect(inventory).toHaveProperty('available');

});
