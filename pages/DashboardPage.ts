import { Page, Locator } from '@playwright/test';
import { ROUTES } from '@config/routes';

export class DashboardPage {
  static readonly path = ROUTES.dashboard;

  constructor(private readonly page: Page) {}

  get userDropdown(): Locator { return this.page.getByRole('banner').getByRole('img', { name: 'profile picture' }) };
  get logoutLink(): Locator { return this.page.getByRole('menuitem', {name: /logout/i}); }

  async logout() {
    await this.userDropdown.click(); 
    await this.logoutLink.click();  
  }
}
