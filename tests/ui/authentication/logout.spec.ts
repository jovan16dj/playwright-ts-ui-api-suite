import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { DashboardPage } from '../../../pages/DashboardPage';

  test('Admin can log out successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    
    await dashboardPage.logout();
    await expect(page.locator('input[name="username"]')).toBeVisible();
});
