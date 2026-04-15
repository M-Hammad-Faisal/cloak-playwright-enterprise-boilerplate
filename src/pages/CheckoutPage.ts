import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
  private readonly firstNameInput = this.page.locator('[data-test="firstName"]');
  private readonly lastNameInput = this.page.locator('[data-test="lastName"]');
  private readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
  private readonly continueButton = this.page.locator('[data-test="continue"]');
  private readonly finishButton = this.page.locator('[data-test="finish"]');
  private readonly completeHeader = this.page.locator('.complete-header');

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.actions.fill(this.firstNameInput, firstName, 'First Name');
    await this.actions.fill(this.lastNameInput, lastName, 'Last Name');
    await this.actions.fill(this.postalCodeInput, postalCode, 'Postal Code');
  }

  async continueCheckout() {
    await this.actions.click(this.continueButton, 'Continue Button');
  }

  async finishCheckout() {
    await this.actions.click(this.finishButton, 'Finish Button');
  }

  async getConfirmationMessage(): Promise<string | null> {
    return await this.actions.getText(this.completeHeader, 'Confirmation Message');
  }
}
