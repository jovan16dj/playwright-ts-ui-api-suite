import { test, expect } from '@playwright/test';
import { createPet } from '@helpers/petHelper';

test('Create a new pet', async ({ request }) => {
  const pet = await createPet(request, {
    name: 'Rex',
    status: 'available'
    
  });

  expect(pet.name).toBe('Rex');
  expect(pet.status).toBe('available');
  expect(typeof pet.id).toBe('number');

});