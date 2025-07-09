import { test, expect } from '@playwright/test';
import { sampleUser, generateOrderData } from '../helpers/dataHelpers';

test('User creates account, logs in, finds a pet, places an order, deletes pet', async ({ request }) => {
  // Pre-requisite: create a pet named "Dog"
  const newDog = {
    id: Math.floor(Math.random() * 100000),
    name: 'Dog',
    photoUrls: ['string'],
    status: 'available'
  };

  const createPetResp = await request.post('/v2/pet', { data: newDog });
  expect(createPetResp.status()).toBe(200);
  const dogPet = await createPetResp.json();

  // 1. Create user
  const createUserResp = await request.post('/v2/user', { data: sampleUser });
  expect(createUserResp.status()).toBe(200);

  // 2. Login user
  const loginResp = await request.get(`/v2/user/login?username=${sampleUser.username}&password=${sampleUser.password}`);
  expect(loginResp.status()).toBe(200);
  const loginText = await loginResp.text();
  expect(loginText).toContain('logged in user session');

  // 3. Get inventory (for completeness)
  const inventoryResp = await request.get('/v2/store/inventory');
  expect(inventoryResp.status()).toBe(200);
  const inventory = await inventoryResp.json();
  expect(inventory).toBeTruthy();

  // 4. Get the pet by ID
  const getPetResp = await request.get(`/v2/pet/${dogPet.id}`);
  expect(getPetResp.status()).toBe(200);
  const fetchedPet = await getPetResp.json();
  expect(fetchedPet.name).toBe('Dog');

  // 5. Place order for the created pet
  const orderData = generateOrderData();
  orderData.petId = dogPet.id;

  const orderResp = await request.post('/v2/store/order', { data: orderData });
  expect(orderResp.status()).toBe(200);

  const order = await orderResp.json();
  expect(order.petId).toBe(dogPet.id);
  expect(order.status).toBe('placed');

  // 6. Delete the pet after purchase
  const deleteResp = await request.delete(`/v2/pet/${dogPet.id}`);
  expect(deleteResp.status()).toBe(200);

  // 7. Confirm deletion
  const getDeletedResp = await request.get(`/v2/pet/${dogPet.id}`);
  expect(getDeletedResp.status()).toBe(404);
});
