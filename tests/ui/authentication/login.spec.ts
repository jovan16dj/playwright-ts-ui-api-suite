import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';

  test('Admin can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

});

  test('Incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid', 'invalid');
    await expect(loginPage.errorToast).toBeVisible();

});