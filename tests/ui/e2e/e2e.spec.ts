import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '@pages/LoginPage';
import { RecruitmentPage } from '@pages/RecruitmentPage';
import { PIMPage } from '@pages/PIMPage';
import { DashboardPage } from '@pages/DashboardPage';

test('E2E: login, create vacancy, candidate, employee, search employee, logout', async ({ page }) => {
  test.setTimeout(60_000);

  const loginPage = new LoginPage(page);
  const recruitment = new RecruitmentPage(page);
  const pim = new PIMPage(page);
  const dashboard = new DashboardPage(page);

  // dynamic data
  const vacancyName = `SDET_${Date.now()}`;
  const candFirst = `${faker.person.firstName()}${faker.number.int({ min:100, max:999 })}`;
  const candLast  = faker.person.lastName();
  const candEmail = faker.internet.email({ firstName: candFirst, lastName: candLast });

  const empFirst = `${faker.person.firstName()}${faker.number.int({ min:100, max:999 })}`;
  const empLast  = faker.person.lastName();

  // 1) Login
  await loginPage.goto();
  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);

  // 2) Create Vacancy
  await recruitment.navigateToVacancies();
  await recruitment.addJobVacancy(vacancyName, 'QA Engineer');

  // 3) Create Candidate
  await recruitment.navigateToCandidates();
  await recruitment.addCandidate(candFirst, candLast, candEmail);

  // 4) Create Employee
  await pim.openAddEmployee();
  const empId = await pim.addEmployee(empFirst, empLast);
  await expect(pim.personalDetailsName).toHaveText(`${empFirst} ${empLast}`);

  // 5) Search Employee by ID
  await pim.pimMenu.click(); // goes to list
  await pim.searchEmployee(undefined, empId);
  await expect(pim.firstResultEmployeeIdCell).toHaveText(new RegExp(empId));

  // 6) Logout
  await dashboard.logout();
  await expect(page.locator('input[name="username"]')).toBeVisible();
});
