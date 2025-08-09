import { Page, Locator } from '@playwright/test';
import { ROUTES } from '@config/routes';

export class LoginPage {
  static readonly path = ROUTES.login;

  constructor(private readonly page: Page) {}

  get username(): Locator { return this.page.getByPlaceholder('Username'); }
  get password(): Locator { return this.page.getByPlaceholder('Password'); }
  get submit(): Locator   { return this.page.getByRole('button', { name: /login/i }); }
  get errorToast(): Locator { return this.page.getByText('/invalid credentials/i'); }

  async goto() {
    await this.page.goto(LoginPage.path);
    await this.username.waitFor(); 
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.submit.click();
    
  }
}
