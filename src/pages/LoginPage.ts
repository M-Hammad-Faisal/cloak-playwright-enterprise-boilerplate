import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.locator('[data-test="username"]');
  private readonly passwordInput = this.page.locator('[data-test="password"]');
  private readonly loginButton = this.page.locator('[data-test="login-button"]');

  async login(username: string = 'standard_user', password: string = 'secret_sauce') {
    await this.navigate();
    await this.actions.fill(this.usernameInput, username, 'Username');
    await this.actions.fill(this.passwordInput, password, 'Password');
    await this.actions.click(this.loginButton, 'Login Button');
  }
}
