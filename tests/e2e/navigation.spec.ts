import { test, expect } from '../support/testFixtures';

// A small, readable smoke test that demonstrates how to use the
// page object fixtures added in `tests/support/testFixtures.ts`.
// The test is intentionally concise so it can serve as an example
// for writing additional end-to-end tests.
test('Homepage loads and sign-in navigation works', async ({ page, homePage, loginPage }) => {
  // Open the site root. `baseURL` is configured in `playwright.config.ts`
  await page.goto('/');

  // Use the HomePage page object to assert the page loaded.
  // This keeps the test focused on intent, not implementation details.
  await homePage.isLoaded();

  // Use the LoginPage helper to navigate to the sign-in page and
  // verify the Login heading is visible.
  await loginPage.open();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
