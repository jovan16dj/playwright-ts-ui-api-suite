import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { RecruitmentPage } from '../../../pages/RecruitmentPage';

  test('Admin can add a new job vacancy', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const recruitmentPage = new RecruitmentPage(page);

    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    await recruitmentPage.navigateToCandidates();

    //Would normally use dynamic data, but keeping it hardcoded here for readability
    await recruitmentPage.addCandidate('Jerry', 'Cantrell','asd@abc.com');

    await recruitmentPage.navigateToCandidates();
    await recruitmentPage.candidateNameInput.fill('Jerry');
    await page.waitForSelector('div[role="listbox"] >> div[role="option"]');
    
    //Long wait for slow results loading on the public demo website
    await page.waitForTimeout(7000);
    
    await page.locator('div[role="listbox"] >> div[role="option"]').first().click();
    await recruitmentPage.searchButton.click();

    const resultRow = page.locator('.oxd-table-row:has-text("Jerry Cantrell")');
    await expect(resultRow).toBeVisible();
});
