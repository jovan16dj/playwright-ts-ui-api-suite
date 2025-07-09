import { APIRequestContext, expect } from '@playwright/test';

export type PetStatus = 'available' | 'pending' | 'sold';

export interface Pet {
  id: number;
  name: string;
  status: PetStatus;
}

export async function createPet(request: APIRequestContext, pet: Partial<Pet>) {
  const response = await request.post('/v2/pet', {
    data: {
      id: pet.id || Date.now(),
      name: pet.name || 'Fluffy',
      status: pet.status || 'available'
    }
  });
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  return body as Pet;
}

export async function getPet(request: APIRequestContext, id: number) {
  const response = await request.get(`/v2/pet/${id}`);
  return response;
}

export async function deletePet(request: APIRequestContext, id: number) {
  return await request.delete(`/v2/pet/${id}`);
}

export async function updatePet(request: APIRequestContext, pet: Pet) {
  return await request.put('/v2/pet', {
    data: pet
  });
}
