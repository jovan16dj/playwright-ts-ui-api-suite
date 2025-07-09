import { test, expect } from '@playwright/test';

test('Find pets by status', async ({ request }) => {
  const response = await request.get('/v2/pet/findByStatus?status=available');
  expect(response.status()).toBe(200);

  const pets = await response.json();
  expect(Array.isArray(pets)).toBeTruthy();

  for (const pet of pets) {
    expect(pet.status).toBe('available');
  }
});

test('Find pets by invalid status returns empty or error', async ({ request }) => {
  const response = await request.get('/v2/pet/findByStatus?status=expired');
  expect(response.status()).toBe(200);

  const pets = await response.json();
  expect(pets.length).toBe(0);
});
