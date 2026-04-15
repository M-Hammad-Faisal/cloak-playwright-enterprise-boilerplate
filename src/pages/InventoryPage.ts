import { BasePage } from './BasePage.js';
import { Item } from '../types/index.js';

export class InventoryPage extends BasePage {
  private readonly inventoryItems = this.page.locator('.inventory_item');
  private readonly sortContainer = this.page.locator('[data-test="product-sort-container"]');
  private readonly cartLink = this.page.locator('.shopping_cart_link');
  private readonly cartBadge = this.page.locator('.shopping_cart_badge');

  async sortItems(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.actions.select(this.sortContainer, option, `Sort: ${option}`);
  }

  async addItemToCart(index: number) {
    const item = this.inventoryItems.nth(index);
    const addButton = item.locator('button:has-text("Add to cart")');
    await this.actions.click(addButton, `Add item #${index} to cart`);
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const count = await this.actions.getText(this.cartBadge, 'Cart Badge');
      return count ? parseInt(count, 10) : 0;
    }
    return 0;
  }

  async clickCart() {
    await this.actions.click(this.cartLink, 'Shopping Cart Link');
  }

  async getItems(): Promise<Item[]> {
    const items: Item[] = [];
    const count = await this.inventoryItems.count();

    for (let i = 0; i < count; i++) {
      const row = this.inventoryItems.nth(i);
      const name = await this.actions.getText(
        row.locator('.inventory_item_name'),
        `Item #${i} Name`
      );
      const description = await this.actions.getText(
        row.locator('.inventory_item_desc'),
        `Item #${i} Desc`
      );
      const price = await this.actions.getText(
        row.locator('.inventory_item_price'),
        `Item #${i} Price`
      );

      if (name && description && price) {
        items.push({
          name: name.trim(),
          description: description.trim(),
          price: price.trim(),
        });
      }
    }

    return items;
  }
}
