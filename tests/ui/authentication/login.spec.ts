import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

  test('Admin can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});