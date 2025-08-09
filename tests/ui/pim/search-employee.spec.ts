import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { PIMPage } from '@pages/PIMPage';
import { loadJson } from '@utils/files';
import path from 'node:path';

test('Admin can search for an employee', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const pim = new PIMPage(page);

  const employeePath = path.resolve(process.cwd(), 'fixtures/runtime/employee.json');
  const { fullName, id } = await loadJson<{ fullName: string; id: string }>(employeePath);

  await loginPage.goto();
  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);

  await pim.pimMenu.click();

  await pim.searchEmployee(fullName, id);

  await expect(pim.readFirstResultEmployeeId()).resolves.toContain(id);
  
});
