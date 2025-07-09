import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { RecruitmentPage } from '../../../pages/RecruitmentPage';

  test('Admin can add a new job vacancy', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const recruitmentPage = new RecruitmentPage(page);
    const baseVacancyName = 'SDET';
    const dynamicVacancyName = `${baseVacancyName}_${Date.now()}`;

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    await recruitmentPage.navigateToVacancies();
    await recruitmentPage.addJobVacancy(dynamicVacancyName, 'QA Engineer','');

    await recruitmentPage.navigateToVacancies();
    await recruitmentPage.jobTitleDropdownIcon.click();
    
    // Short wait to let dropdown populate
    await page.waitForTimeout(500); 
    
    const jobOption = page.locator(`div[role="option"] >> span:text-is("QA Engineer")`);
    await jobOption.waitFor({ state: 'visible' });
    await jobOption.click();

    await recruitmentPage.searchButton.click();

    // Assert vacancy appears in the results
    const resultRow = page.locator(`.oxd-table-row:has-text("${dynamicVacancyName}")`);
    await expect(resultRow).toBeVisible();
    
    // Wait added so that the screenshot is not taken too early
    await page.waitForTimeout(700); 
});
