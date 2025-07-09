import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly userDropdown: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userDropdown = page.locator('.oxd-userdropdown-tab'); 
    this.logoutLink = page.getByRole('menuitem', {name: 'Logout'});
  }

  async logout() {
    await this.userDropdown.click(); 
    await this.logoutLink.click();  
    await this.page.waitForURL(/auth\/login/);
  }
}
