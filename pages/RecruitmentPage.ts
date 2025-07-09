import { Page, Locator } from '@playwright/test';

export class RecruitmentPage {
  readonly page: Page;
  readonly recruitmentMenu: Locator;
  readonly vacanciesTab: Locator;
  readonly addVacancyButton: Locator;
  readonly vacancyNameInput: Locator;
  readonly jobTitleDropdownIcon: Locator;
  readonly jobTitleDropdownList: Locator;
  readonly saveButton: Locator;
  readonly hiringManagerInput: Locator; 
  readonly searchButton: Locator; 
  readonly candidatesTab: Locator;
  readonly addCandidateButton: Locator;
  readonly candidateNameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.recruitmentMenu = page.locator('nav').locator('a:has-text("Recruitment")');
    this.vacanciesTab = page.locator('a.oxd-topbar-body-nav-tab-item:has-text("Vacancies")');
    this.addVacancyButton = page.locator('button:has-text("Add")');
    this.vacancyNameInput = page.locator('//label[text()="Vacancy Name"]/ancestor::div[contains(@class, "oxd-input-group")]//input');
    this.jobTitleDropdownIcon = page.locator('//label[text()="Job Title"]/ancestor::div[contains(@class, "oxd-grid-item")]//i[contains(@class, "oxd-select-text--arrow")]');
    this.jobTitleDropdownList = page.locator('div[role="listbox"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.hiringManagerInput = page.locator('input[placeholder="Type for hints..."]');
    this.searchButton = page.locator('button:has-text("Search")'); 
    this.candidatesTab = page.locator('a.oxd-topbar-body-nav-tab-item:has-text("Candidates")');
    this.addCandidateButton = page.locator('button:has-text("Add")');
    this.candidateNameInput = page.locator('//label[text()="Candidate Name"]/following::input[1]');
  }

  async navigateToVacancies() {
    await this.recruitmentMenu.click();
    await this.vacanciesTab.click();
    await this.page.waitForURL(/recruitment\/viewJobVacancy/);
  }

  async addJobVacancy(vacancyName: string, jobTitle: string, hiringManager: string) {
    await this.addVacancyButton.click();

    await this.vacancyNameInput.waitFor({ state: 'visible' });
    await this.vacancyNameInput.fill(vacancyName);

    await this.jobTitleDropdownIcon.click();
    await this.page.waitForTimeout(1000);

    await this.jobTitleDropdownList.waitFor({ state: 'visible' });
    const option = this.jobTitleDropdownList.locator(`div[role="option"] >> span:text-is("${jobTitle}")`);
    await option.waitFor({ state: 'visible' });
    await option.click();

    //Hardcoded Hiring Manager for the public demo, would use dynamic/test data file
    await this.hiringManagerInput.fill('a');
    await this.page.waitForSelector('div[role="listbox"] >> div[role="option"]', { timeout: 5000 });

    //Long wait for slow results loading on the public demo website
    await this.page.waitForTimeout(7000);

    const firstOption = this.page.locator('div[role="listbox"] >> div[role="option"]').first();
    await firstOption.click();

    await this.saveButton.click();
    await this.page.waitForURL(/\/recruitment\/addJobVacancy\/\d+$/);
  }

  async navigateToCandidates() {
    await this.recruitmentMenu.click();
    await this.candidatesTab.click();
    await this.page.waitForURL(/recruitment\/viewCandidates/);
  }

  async addCandidate(firstName: string, lastName: string, email: string) {
    await this.addCandidateButton.click();

    const firstNameInput = this.page.locator('input[placeholder="First Name"]');
    const lastNameInput = this.page.locator('input[placeholder="Last Name"]');
    const emailInput = this.page.locator('//label[text()="Email"]/following::input[1]');

    await firstNameInput.fill(firstName);
    await lastNameInput.fill(lastName);
    await emailInput.fill(email);

    await this.saveButton.click();
    await this.page.waitForURL(/\/recruitment\/addCandidate\/\d+$/);
  }
}
