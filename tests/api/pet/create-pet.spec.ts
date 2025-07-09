
import { test, expect } from '@playwright/test';
import { createPet } from '../helpers/petHelper';

test('Create a new pet', async ({ request }) => {
  const pet = await createPet(request, {
    name: 'Rex',
    status: 'available'
  });

  expect(pet.name).toBe('Rex');
  expect(pet.status).toBe('available');
  expect(typeof pet.id).toBe('number');
});
/*
import { test, expect } from '@playwright/test';
import { createPet } from './helpers/petHelper';

test('Create a new pet', async ({ request }) => {
  await test.step('Send request to create pet', async () => {
    const pet = await createPet(request, {
      name: 'Rex',
      status: 'available',
    });

    await test.step('Validate pet response', async () => {
      expect(pet.name).toBe('Rex');
      expect(pet.status).toBe('available');
      expect(typeof pet.id).toBe('number');
    });
  });
});
*/