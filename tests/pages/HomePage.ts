import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// Page object representing the site's home page.
// Keep simple, readable methods that represent user-level actions
// and checks. Tests should call these methods instead of using
// low-level locators directly.
export class HomePage extends BasePage {
  readonly banner: Locator;

  /**
   * Construct the HomePage with common locators.
   * @param page Playwright Page instance
   */
  constructor(page: Page) {
    super(page);
    // Locator for the prominent banner image shown on the homepage.
    // Using alt text is resilient if the site provides accessible images.
    this.banner = page.getByAltText('Banner');
  }

  /**
   * Simple check to assert the home page has loaded.
   * Tests can call this as a readable, intent-revealing step.
   */
  async isLoaded() {
    await expect(this.banner).toBeVisible();
  }
}
