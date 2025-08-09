import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '@pages/LoginPage';
import { RecruitmentPage } from '@pages/RecruitmentPage';

test('Admin can add a candidate and find them by name', async ({ page }) => {
  const login = new LoginPage(page);
  const recruit = new RecruitmentPage(page);

  await login.goto();
  await login.login(process.env.USERNAME!, process.env.PASSWORD!);

  await recruit.navigateToCandidates();

  const first = faker.person.firstName();
  const uniqueFirst = `${first}${faker.number.int({ min: 100, max: 999 })}`;
  const last = faker.person.lastName();
  const email = faker.internet.email({ firstName: first, lastName: last });

  await recruit.addCandidate(uniqueFirst, last, email);

  await recruit.navigateToCandidates();
  await recruit.filterCandidateByName(uniqueFirst);

  await expect(recruit.rowContaining(first)).toBeVisible();
});
