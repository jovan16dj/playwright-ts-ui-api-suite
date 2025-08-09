import { test, expect } from '@playwright/test';
import { createPet, updatePet, getPet, deletePet } from '../helpers/petHelper';

test('Update an existing pet', async ({ request }) => {
  const pet = await createPet(request, { name: 'Shadow', status: 'available' });

  pet.name = 'ShadowX';
  pet.status = 'sold';
  const updateResponse = await updatePet(request, pet);

  expect(updateResponse.ok()).toBeTruthy();
  const updated = await updateResponse.json();
  expect(updated.name).toBe('ShadowX');
  expect(updated.status).toBe('sold');

  await deletePet(request, pet.id);
  
});
