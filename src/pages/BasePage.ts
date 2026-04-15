import { Page } from 'playwright-core';
import { CONFIG } from '../config/index.js';
import { Actions } from '../utils/actions.js';

export class BasePage {
  protected actions: Actions;

  constructor(protected page: Page) {
    this.actions = new Actions(page);
  }

  async navigate(path: string = '') {
    await this.actions.navigate(`${CONFIG.baseUrl}/${path}`, path || 'Home');
  }

  async getTitle() {
    return await this.page.title();
  }
}
