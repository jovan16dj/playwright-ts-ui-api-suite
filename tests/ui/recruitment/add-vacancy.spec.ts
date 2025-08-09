import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { RecruitmentPage } from '@pages/RecruitmentPage';

test('Admin can add a new job vacancy', async ({ page }) => {
  const login = new LoginPage(page);
  const recruit = new RecruitmentPage(page);

  const vacancyName = `SDET_${Date.now()}`;
  const jobTitle = 'QA Engineer';

  await login.goto();
  await login.login(process.env.USERNAME!, process.env.PASSWORD!);

  await recruit.navigateToVacancies();
  await recruit.addJobVacancy(vacancyName, jobTitle);

  await recruit.navigateToVacancies();
  await recruit.jobTitleDropdown.click();
  await recruit.listbox.waitFor({ state: 'visible' });
  await recruit.optionByExact(jobTitle).click();
  await recruit.searchButton.click();
  await recruit.waitForLoaderGone();

  await expect(recruit.rowContaining(vacancyName)).toBeVisible();
});
