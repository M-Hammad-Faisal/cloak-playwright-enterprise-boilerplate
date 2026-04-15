import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  private readonly checkoutButton = this.page.locator('[data-test="checkout"]');
  private readonly cartItems = this.page.locator('.cart_item');

  async checkout() {
    await this.actions.click(this.checkoutButton, 'Checkout Button');
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }
}
