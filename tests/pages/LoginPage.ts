import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

// Page object for the Login flow. This keeps locators and actions
// encapsulated so tests remain easy to read and maintain.
export class LoginPage extends BasePage {
  readonly signInLink: Locator;
  readonly heading: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  /**
   * Create a LoginPage using resilient locators that try to handle
   * small markup variations. Replace with explicit selectors (data-test)
   * once available for improved stability.
   */
  constructor(page: Page) {
    super(page);
    // Link that navigates to the sign-in page
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    // Main heading shown on the sign-in page
    this.heading = page.getByRole('heading', { name: 'Login' });

    // Best-effort resilient locators for typical login forms.
    // These try several common attribute combinations; prefer a
    // single explicit locator (e.g. data-test) when possible.
    this.username = page.locator('input[name="username"], input[name="email"], input#username, input#email');
    this.password = page.locator('input[type="password"], input[name="password"]');
    // Generic submit matcher with fallbacks. We prefer explicit
    // attributes (data-test) but these selectors try to cover common
    // variations: buttons with visible text or conventional submit inputs.
    this.submit = page.locator(
      'button[type="submit"], input[type="submit"], button:has-text("Sign in"), button:has-text("Login")'
    );
  }

  /**
   * Open the sign-in page by clicking the sign-in link and wait for
   * the heading to be visible as a confirmation.
   */
  async open() {
    await this.signInLink.click();
    await expect(this.heading).toBeVisible();
  }

  /**
   * Return whether the login heading is currently visible. Useful for
   * quick checks in tests.
   */
  async isVisible() {
    return await this.heading.isVisible();
  }

  /**
   * Perform a login by filling credentials and submitting the form.
   * Note: Do not hard-code credentials in tests; prefer environment
   * variables or a test data manager.
   */
  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }
}
