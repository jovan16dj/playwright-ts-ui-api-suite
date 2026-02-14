import { test, expect } from '@playwright/test';
import { generateOrderData } from '@helpers/dataHelpers';

test('Place an order', async ({ request }) => {
  const orderData = generateOrderData();

  const response = await request.post('/v2/store/order', { data: orderData });
  expect(response.status()).toBe(200);

  const order = await response.json();
  expect(order.id).toBe(orderData.id);
  expect(order.status).toBe('placed');
  
});
