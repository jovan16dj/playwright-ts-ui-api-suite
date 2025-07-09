import { Page, Locator, expect } from '@playwright/test';

export class PIMPage {
    readonly page: Page;
    readonly pimMenu: Locator;
    readonly addButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly saveButton: Locator;
    readonly personalDetailsHeader: Locator;
    readonly nationalityLabel: Locator;
    readonly searchNameInput: Locator;
    readonly searchIdInput: Locator;
    readonly searchButton: Locator;
    readonly resultRow: Locator;
    readonly firstResultEmployeeIdCell: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.locator('nav').locator('span:has-text("PIM")');
    this.addButton = page.locator('button:has-text("Add")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/input');
    this.saveButton = page.locator('button:has-text("Save")');
    this.personalDetailsHeader = page.getByRole('heading', { name: 'Personal Details' });
    this.nationalityLabel = page.locator('label:has-text("Nationality")');
    this.searchNameInput = page.locator('div.oxd-autocomplete-text-input input[placeholder="Type for hints..."]').first();
    this.searchIdInput = page.locator('label:has-text("Employee Id")').locator('..').locator('..').locator('input');
    this.searchButton = page.locator('button:has-text("Search")');
    this.resultRow = page.locator('.oxd-table-body .oxd-table-row');
    this.firstResultEmployeeIdCell = this.resultRow.first().locator('div[role="cell"] >> nth=1');
  }

  async navigateToAddEmployee() {
    await this.pimMenu.click();
    await this.page.waitForURL(/pim\/viewEmployeeList/);
    await this.addButton.click();
    await this.page.waitForURL(/pim\/addEmployee/);
  }
  
  async addEmployee(firstName: string, lastName: string): Promise<{ fullName: string; id: string }> {
    const randomId = `emp${Math.floor(Math.random() * 1_000_0000).toString().padStart(7, '0')}`;

    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(firstName);

    await this.lastNameInput.waitFor({ state: 'visible' });
    await this.lastNameInput.fill(lastName);

    await this.employeeIdInput.waitFor({ state: 'visible' });
    await this.employeeIdInput.fill('');
    await this.employeeIdInput.fill(randomId);

    await this.saveButton.waitFor({ state: 'visible' });
    await this.saveButton.click();

    await this.page.waitForURL(/pim\/viewPersonalDetails\/.*/);

    return { fullName: `${firstName} ${lastName}`, id: randomId };
  }

  async waitForPersonalDetailsToLoad() {
    await this.personalDetailsHeader.waitFor({ state: 'visible' });
    await this.nationalityLabel.waitFor({ state: 'visible' });
  }

  async searchEmployee(name: string, id?: string) {
    await this.searchNameInput.waitFor({ state: 'visible' });
    await this.searchNameInput.fill(name);

    if (name) {
    await this.searchNameInput.waitFor({ state: 'visible' });
    await this.searchNameInput.fill(name);
  }

    if (id) {
    await this.searchIdInput.waitFor({ state: 'visible' });
    await this.searchIdInput.fill(id);
  }
    await this.searchButton.waitFor({ state: 'visible' });
    await this.searchButton.click();
    
    await this.resultRow.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async assertFirstResultHasId(expectedId: string) {
    await expect(this.firstResultEmployeeIdCell).toHaveText(
      new RegExp(expectedId),
      { timeout: 10000 }
    );
  }

  async getSearchResults(): Promise<string[]> {
    const rows = await this.resultRow.allTextContents();
    return rows;
  }

  async navigateToEmployeeList() {
    await this.pimMenu.click();
    await this.page.waitForURL(/pim\/viewEmployeeList/);
  }
}
