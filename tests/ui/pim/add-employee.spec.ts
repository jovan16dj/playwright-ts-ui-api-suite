import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '@pages/LoginPage';
import { PIMPage } from '@pages/PIMPage';
import { saveJson } from '@utils/files';
import path from 'node:path';

test('Admin can add a new employee', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const pim = new PIMPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;

  await loginPage.goto();
  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);

  await pim.openAddEmployee();
  const id = await pim.addEmployee(firstName, lastName);

  await expect(pim.personalDetailsName).toHaveText(fullName);

  // Save data for the search test (gitignore: fixtures/runtime/*)
  const outFile = path.resolve(process.cwd(), 'fixtures/runtime/employee.json');
  await saveJson(outFile, { fullName, id });

});
