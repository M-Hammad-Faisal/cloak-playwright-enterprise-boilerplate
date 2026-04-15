import { launch } from 'cloakbrowser';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { CONFIG } from '../config/index.js';
import { Logger } from '../utils/logger.js';

async function main() {
  Logger.banner();
  Logger.step('Completing Checkout Flow');

  Logger.info('Launching Cloak Browser...');
  const browser = await launch(CONFIG.browser);

  try {
    const page = await browser.newPage();

    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    Logger.info('Logging in to Sauce Demo...');
    await loginPage.login(CONFIG.credentials.standard.user, CONFIG.credentials.standard.pass);

    Logger.info('Sorting and adding items...');
    await inventoryPage.sortItems('hilo');
    await inventoryPage.addItemToCart(0); // Most expensive

    await inventoryPage.sortItems('lohi');
    await inventoryPage.addItemToCart(0); // Cheapest

    Logger.info('Navigating to cart and verifying items...');
    await inventoryPage.clickCart();
    const cartCount = await cartPage.getCartItemsCount();
    Logger.info(`Cart verified with ${cartCount} items.`);

    Logger.info('Proceeding to checkout...');
    await cartPage.checkout();
    await checkoutPage.fillInformation('John', 'Doe', '12345');
    await checkoutPage.continueCheckout();
    await checkoutPage.finishCheckout();

    const message = await checkoutPage.getConfirmationMessage();
    Logger.success(`Purchase complete: ${message}`);

    // Screenshot
    if (!fs.existsSync(CONFIG.screenshotsDir)) {
      fs.mkdirSync(CONFIG.screenshotsDir, { recursive: true });
    }
    const screenshotPath = path.join(CONFIG.screenshotsDir, 'confirmation.png');
    await page.screenshot({ path: screenshotPath });
    Logger.success(`Screenshot saved to: ${screenshotPath}`);
  } catch (error) {
    Logger.error('Checkout flow failed', error);
  } finally {
    Logger.info('Closing browser...');
    await browser.close();
  }
}

main().catch((err) => {
  Logger.error('Fatal execution error', err);
  process.exit(1);
});
