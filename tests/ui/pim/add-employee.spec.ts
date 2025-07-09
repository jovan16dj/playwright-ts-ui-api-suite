import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { PIMPage } from '../../../pages/PIMPage';
import fs from 'fs';
import path from 'path';

  test('Admin can add a new employee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    await pimPage.navigateToAddEmployee();

    const { fullName, id } = await pimPage.addEmployee('John', 'Doe');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Save employee data to JSON file
    const outputPath = path.join(__dirname, '../../../fixtures/employee.json');
    fs.writeFileSync(outputPath, JSON.stringify({ fullName, id }, null, 2));
});
