import { Page, Locator } from '@playwright/test';
import { ROUTES } from '@config/routes';

export class DashboardPage {
  static readonly path = ROUTES.dashboard;

  constructor(private readonly page: Page) {}

  get userDropdown(): Locator { return this.page.locator('.oxd-userdropdown-tab') }
  get userMenu(): Locator { return this.page.locator('.oxd-dropdown-menu')}
  get logoutLink(): Locator { return this.userMenu.getByRole('menuitem', {name: /logout/i}); }

  async logout() {
    await this.userDropdown.click(); 
    await this.userMenu.waitFor();
    await this.logoutLink.click();  
  }
}
