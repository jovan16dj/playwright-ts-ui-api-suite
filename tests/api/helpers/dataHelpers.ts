export const sampleUser = {
  id: 1001,
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 's3cr3t123',
  phone: '1234567890',
  userStatus: 1,
};

export const generateOrderData = () => ({
  id: Math.floor(Math.random() * 100000),
  petId: 1,
  quantity: 2,
  shipDate: new Date().toISOString(),
  status: 'placed',
  complete: false,
});
