import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { PIMPage } from '../../../pages/PIMPage';
import path from 'path';
import fs from 'fs';

// Load employee data from JSON
const employeeDataPath = path.join(__dirname, '../../../fixtures/employee.json');
const employee = JSON.parse(fs.readFileSync(employeeDataPath, 'utf-8'));

  test('Admin can search for an employee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    await pimPage.navigateToEmployeeList();

    await pimPage.searchEmployee(employee.fullName, employee.id);
    await pimPage.assertFirstResultHasId(employee.id);

    await expect(pimPage.resultRow.first()).toBeVisible();
});
