import { test, expect } from '@playwright/test';
import { createPet, getPet, deletePet } from '../helpers/petHelper';

test('Get pet by ID', async ({ request }) => {
  const newPet = await createPet(request, { name: 'Bella' });

  //API very flaky, so added the timeout. Still fails occasionally.
  await new Promise((res) => setTimeout(res, 6000));

  const response = await getPet(request, newPet.id);
  expect(response.status()).toBe(200);

  const pet = await response.json();
  expect(pet.id).toBe(newPet.id);
  expect(pet.name).toBe('Bella');

  await deletePet(request, newPet.id);
});

test('Get non-existent pet returns 404', async ({ request }) => {
  const response = await getPet(request, 999999999);
  expect(response.status()).toBe(404);
});
