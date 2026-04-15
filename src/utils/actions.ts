import { Page, Locator } from 'playwright-core';
import { Logger } from './logger.js';

export class Actions {
  constructor(private page: Page) {}

  /**
   * Navigate to a URL with logging
   */
  async navigate(url: string, description: string = url) {
    Logger.info(`Navigating to: ${description}`);
    await this.page.goto(url);
  }

  /**
   * Click an element with logging and waiting
   */
  async click(locator: Locator, description: string) {
    Logger.info(`Clicking: ${description}`);
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Fill an input with logging
   */
  async fill(locator: Locator, value: string, description: string) {
    Logger.info(`Typing "${description}": ${value.replace(/./g, '*')}`); // Masking for logs
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  /**
   * Select an option with logging
   */
  async select(locator: Locator, value: string, description: string) {
    Logger.info(`Selecting "${description}": ${value}`);
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(value);
  }

  /**
   * Get text content with logging
   */
  async getText(locator: Locator, description: string): Promise<string | null> {
    const text = await locator.textContent();
    Logger.info(`Read "${description}": ${text?.trim()}`);
    return text;
  }
}
