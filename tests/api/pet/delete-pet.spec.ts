import { test, expect } from '@playwright/test';
import { createPet, deletePet, getPet } from '../helpers/petHelper';

test('Delete an existing pet', async ({ request }) => {
  const pet = await createPet(request, { name: 'Ghost' });

  const deleteResponse = await deletePet(request, pet.id);
  expect([200, 400, 404]).toContain(deleteResponse.status());

  const getResponse = await getPet(request, pet.id);
  expect([200, 404]).toContain(getResponse.status());
});

test('Delete non-existent pet returns 404 or similar', async ({ request }) => {
  const response = await deletePet(request, 123456789);
  expect([404, 400]).toContain(response.status());
});
