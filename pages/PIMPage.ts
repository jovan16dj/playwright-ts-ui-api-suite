import { Page, Locator } from '@playwright/test';
import { ROUTES } from '@config/routes';

export class PIMPage {
  static readonly listPath = ROUTES.pimList;
  static readonly addPath = ROUTES.pimAdd;

  constructor(private readonly page: Page) {}

  get pimMenu(): Locator { return this.page.locator('nav').getByText('PIM', { exact: true }); }
  get addButton(): Locator { return this.page.getByRole('button', { name: /add/i }); }
  get firstNameInput(): Locator { return this.page.locator('input[name="firstName"]'); }
  get lastNameInput(): Locator { return this.page.locator('input[name="lastName"]'); }
  get employeeIdInput(): Locator { return this.page.locator('label:has-text("Employee Id")').locator('..').locator('..').locator('input'); }
  get saveButton(): Locator { return this.page.getByRole('button', { name: /save/i }); }
  get personalDetailsHeader(): Locator { return this.page.getByRole('heading', { name: /personal details/i }); }
  get nationalityLabel(): Locator { return this.page.getByText(/nationality/i); }
  get searchNameInput(): Locator { return this.page.locator('div.oxd-autocomplete-text-input input[placeholder="Type for hints..."]').first(); }
  get searchIdInput(): Locator { return this.page.locator('label:has-text("Employee Id")').locator('..').locator('..').locator('input'); }
  get searchButton(): Locator   { return this.page.getByRole('button', { name: /search/i }); }
  get resultsRows(): Locator    { return this.page.locator('.oxd-table-body .oxd-table-row'); }
  get firstResultEmployeeIdCell(): Locator { return this.resultsRows.first().locator('div[role="cell"]').nth(1); }
  get personalDetailsName(): Locator { return this.page.locator('h6.oxd-text.oxd-text--h6.--strong'); }

  async openAddEmployee() {
    await this.pimMenu.click();
    await this.addButton.click();
  }

  async addEmployee(firstName: string, lastName: string, employeeId?: string): Promise<string> {
    const id = employeeId ?? this.makeEmployeeId();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.fill(''); 
    await this.employeeIdInput.fill(id);
    await this.saveButton.click();

    //add this wait to accomodate slow website transition 
    await this.personalDetailsName.waitFor({ state: 'visible' });

    return id;
  }

  async searchEmployee(name?: string, id?: string) {
  if (name) await this.searchNameInput.fill(name);
  if (id)   await this.searchIdInput.fill(id);

  await Promise.all([
    this.searchButton.click(),
    // horrible wait hack because the ui is very slow
    this.page.waitForTimeout (5000)
  ]);

  await Promise.race([
    this.resultsRows.first().waitFor({ state: 'visible', timeout: 10_000 }),
  ]).catch(() => {});
}

  async readFirstResultEmployeeId(): Promise<string> {
    return (await this.firstResultEmployeeIdCell.textContent())?.trim() ?? '';
  }

  private makeEmployeeId(prefix = 'emp'): string {
    const n = Math.floor(Math.random() * 1_000_000).toString().padStart(6, '0');
    return `${prefix}${n}`;
  }
}
