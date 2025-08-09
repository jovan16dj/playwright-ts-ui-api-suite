import { Page, Locator } from '@playwright/test';

export class RecruitmentPage {
  constructor(private readonly page: Page) {}

  get loading(): Locator { return this.page.locator('.oxd-loading-spinner, .oxd-loading-overlay'); }
  async waitForLoaderGone() { await this.loading.first().waitFor({ state: 'detached', timeout: 15000 }).catch(() => {}); }

  get recruitmentMenu(): Locator { return this.page.locator('nav').getByText('Recruitment', { exact: true }); }
  get vacanciesTab(): Locator { return this.page.locator('a.oxd-topbar-body-nav-tab-item:has-text("Vacancies")'); }
  get candidatesTab(): Locator { return this.page.locator('a.oxd-topbar-body-nav-tab-item:has-text("Candidates")'); }

  get addButton(): Locator { return this.page.getByRole('button', { name: /add/i }); }
  get saveButton(): Locator { return this.page.getByRole('button', { name: /save/i }); }
  get searchButton(): Locator { return this.page.getByRole('button', { name: /search/i }); }

  get vacancyNameInput(): Locator { return this.page.locator('//label[text()="Vacancy Name"]/ancestor::div[contains(@class, "oxd-input-group")]//input'); }
  get jobTitleDropdown(): Locator { return this.page.locator('.oxd-grid-item:has(label:has-text("Job Title")) .oxd-select-text').first(); }
  get typeaheadInput(): Locator { return this.page.getByPlaceholder('Type for hints...').first(); }
  get listbox(): Locator { return this.page.locator('div[role="listbox"]'); }
  get listboxOptions(): Locator { return this.listbox.locator('div[role="option"]'); }
  get listboxRealOptions(): Locator {
  return this.listboxOptions.filter({ hasText: /^(?!\s*(Searching\.{0,3}|No Records Found)\s*$).+/i });
  }
  optionByExact(name: string): Locator { return this.page.getByRole('option', { name, exact: true }); }
  get candidateFirstName(): Locator { return this.page.getByPlaceholder('First Name'); }
  get candidateLastName(): Locator { return this.page.getByPlaceholder('Last Name'); }
  get candidateEmail(): Locator { return this.page.locator('//label[normalize-space()="Email"]/following::input[1]'); }
  get candidateNameInput(): Locator { return this.page.locator('//label[text()="Candidate Name"]/following::input[1]'); }
  get tableRows(): Locator { return this.page.locator('.oxd-table-body .oxd-table-row'); }
  rowContaining(text: string): Locator { return this.tableRows.filter({ has: this.page.getByText(text) }); }

  async navigateToVacancies() {
    await this.recruitmentMenu.click();
    await this.vacanciesTab.click();
    await this.tableRows.first().waitFor({ state: 'visible' });
  }

  async navigateToCandidates() {
    await this.recruitmentMenu.click();
    await this.candidatesTab.click();
    await this.tableRows.first().waitFor({ state: 'visible' });
  }

  async addJobVacancy(vacancyName: string, jobTitle: string, hiringManagerHint = 'a') {
    await this.addButton.click();
    await this.vacancyNameInput.waitFor({ state: 'visible' });
    await this.vacancyNameInput.fill(vacancyName);

    await this.jobTitleDropdown.click();
    await this.listbox.waitFor({ state: 'visible' });
    await this.optionByExact(jobTitle).first().click();

    await this.typeaheadInput.fill(hiringManagerHint);
    await this.listbox.waitFor({ state: 'visible' });
    // horrible wait added for horribly slow options loading
    await this.page.waitForTimeout (5000);
    await this.listbox.getByRole('option').first().click();

    await this.saveButton.click();
    await this.page.waitForURL(/\/recruitment\/addJobVacancy\/\d+$/);
}

  async addCandidate(firstName: string, lastName: string, email: string) {
    await this.addButton.click();
    await this.candidateFirstName.fill(firstName);
    await this.candidateLastName.fill(lastName);
    await this.candidateEmail.fill(email);
    await this.saveButton.click();
    await this.waitForLoaderGone();
  }

  async filterCandidateByName(partialName: string) {
    await this.candidateNameInput.fill(partialName);
    await this.listbox.waitFor({ state: 'visible' }).catch(() => {});

    const target = this.listbox.locator('div[role="option"]').filter({ hasText: partialName });
    await target.first().waitFor({ state: 'visible', timeout: 5000 });
    await target.first().click();

    await this.searchButton.click();
    await this.waitForLoaderGone();
}

}
