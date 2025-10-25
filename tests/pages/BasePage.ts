import { Page } from '@playwright/test';

// BasePage: a small reusable base class for page objects.
// Keep browser interaction helpers and shared utilities here so
// individual page objects stay focused on page-specific locators
// and actions.
export class BasePage {
  readonly page: Page;

  /**
   * BasePage constructor
   * @param page Playwright Page instance for the current test
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path relative to the configured baseURL.
   * Default goes to the site root ('/').
   * Keeping this method here centralizes navigation behavior (timeouts, logging, etc.)
   */
  async goto(path = '/') {
    await this.page.goto(path);
  }
}
