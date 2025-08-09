// tests/ui/pim/employee.serial.spec.ts
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '@pages/LoginPage';
import { PIMPage } from '@pages/PIMPage';
import { saveJson, loadJson } from '@utils/files';
import path from 'node:path';

test.describe.serial('PIM add + search', () => {
  test('Admin can add a new employee', async ({ page }) => {
    const login = new LoginPage(page);
    const pim = new PIMPage(page);

    const first = faker.person.firstName();
    const last  = faker.person.lastName();
    const full  = `${first} ${last}`;

    await login.goto();
    await login.login(process.env.USERNAME!, process.env.PASSWORD!);

    await pim.openAddEmployee();
    const id = await pim.addEmployee(first, last);
    await expect(pim.personalDetailsName).toHaveText(full);

    const outFile = path.resolve(process.cwd(), 'fixtures/runtime/employee.json');
    await saveJson(outFile, { fullName: full, id });
  });

  test('Admin can search for an employee', async ({ page }) => {
    const login = new LoginPage(page);
    const pim = new PIMPage(page);

    const employeePath = path.resolve(process.cwd(), 'fixtures/runtime/employee.json');
    const { fullName, id } = await loadJson<{ fullName: string; id: string }>(employeePath);

    await login.goto();
    await login.login(process.env.USERNAME!, process.env.PASSWORD!);

    await pim.pimMenu.click();
    await pim.searchEmployee(fullName, id);

    await expect(pim.firstResultEmployeeIdCell).toHaveText(new RegExp(id));
  });
});
