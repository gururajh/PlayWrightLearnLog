import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

// Define the additional fixtures (page objects) we'll expose to tests.
// Keeping page objects as fixtures means each test gets a fresh
// instance and can use `test` with named parameters for readability.
type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};

// Extend Playwright's `test` to include the page objects. Tests can
// import `{ test }` from this file and receive typed fixtures.
export const test = base.extend<TestFixtures>({
  // Provide a LoginPage instance to tests that request `loginPage`.
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  // Provide a HomePage instance to tests that request `homePage`.
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

// Re-export expect so test files can import from this module only.
export { expect };
