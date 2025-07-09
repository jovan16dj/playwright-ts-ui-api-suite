import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { RecruitmentPage } from '../../../pages/RecruitmentPage';
import { PIMPage } from '../../../pages/PIMPage';
import { DashboardPage } from '../../../pages/DashboardPage';

  test('E2E: login, create vacancy, candidate, employee, search employee, logout', async ({ page }) => {
    test.setTimeout(60000);
    const loginPage = new LoginPage(page);
    const recruitmentPage = new RecruitmentPage(page);
    const pimPage = new PIMPage(page);
    const dashboardPage = new DashboardPage(page);

    // Test data
    const vacancyName = `SDET_${Date.now()}`;
    const candidateFirstName = 'Jerry';
    const candidateLastName = 'Cantrell';
    const candidateEmail = 'asd@abc.com'; 
    const employeeFirstName = 'Jerry';
    const employeeLastName = 'Cantrell';

    // 1. Login
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');

    // 2. Create Vacancy
    await recruitmentPage.navigateToVacancies();
    await recruitmentPage.addJobVacancy(vacancyName, 'QA Engineer', '');

    // 3. Create Candidate
    await recruitmentPage.navigateToCandidates();
    await recruitmentPage.addCandidate(candidateFirstName, candidateLastName, candidateEmail);

    // 4. Create Employee
    await pimPage.navigateToAddEmployee();
    const { fullName, id: employeeId } = await pimPage.addEmployee(employeeFirstName, employeeLastName);
    await pimPage.waitForPersonalDetailsToLoad();

    // 5. Search Employee
    await pimPage.navigateToEmployeeList();
    await page.waitForTimeout (7000);
    await pimPage.searchEmployee('', employeeId); // pass only ID
    await pimPage.assertFirstResultHasId(employeeId);

    // 6. Logout
    await dashboardPage.logout(); 
    await expect(page.locator('input[name="username"]')).toBeVisible();
});
