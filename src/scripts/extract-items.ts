import { launch } from 'cloakbrowser';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CONFIG } from '../config/index.js';
import { Logger } from '../utils/logger.js';
import { CSVUtils } from '../utils/csv-utils.js';

async function main() {
  Logger.banner();
  Logger.step('Extracting Items to CSV');

  Logger.info(`Launching Cloak Browser (headless: ${CONFIG.browser.headless})...`);
  const browser = await launch(CONFIG.browser);

  try {
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    Logger.info('Logging in to Sauce Demo...');
    await loginPage.login(CONFIG.credentials.standard.user, CONFIG.credentials.standard.pass);

    Logger.info('Extracting all items from inventory...');
    const items = await inventoryPage.getItems();
    Logger.info(`Found ${items.length} items.`);

    Logger.info('Saving data to CSV...');
    const filePath = await CSVUtils.saveItems(items, 'extracted_items.csv');

    Logger.success(`Successfully saved items to: ${filePath}`);
  } catch (error) {
    Logger.error('Extraction failed', error);
  } finally {
    Logger.info('Closing browser...');
    await browser.close();
  }
}

main().catch((err) => {
  Logger.error('Fatal execution error', err);
  process.exit(1);
});
