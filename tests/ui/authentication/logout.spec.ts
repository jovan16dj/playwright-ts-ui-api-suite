import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';

  test('Admin can log out successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD! );

    await dashboardPage.logout();
    await expect(loginPage.username).toBeVisible();
    
});
