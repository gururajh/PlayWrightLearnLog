import { test, expect } from '@playwright/test';

test('DuckDuckGo search and click first result', async ({ page, context }) => {
  await context.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
  });

  const query = 'Gururaja Hegde V Senior QA';

  await page.goto('https://duckduckgo.com/');

  // Simulate human mouse movement before typing
  await page.mouse.move(100, 100);
  await page.waitForTimeout(500);

  const searchInput = page.locator('input[name="q"]');
  await searchInput.waitFor({ state: 'visible', timeout: 5000 });
  await searchInput.click();
  await page.keyboard.type(query, { delay: 100 });
  await page.keyboard.press('Enter');

  // Wait for navigation (search results) to load
  await page.waitForLoadState('networkidle');

  if (page.url().includes('/static-pages/418.html')) {
    throw new Error('Blocked by DuckDuckGo anti-bot page');
  }

  // Wait for the first search result link
  const firstResult = page.locator('a.result__a').first();
  await firstResult.waitFor({ state: 'visible', timeout: 10000 });

  await Promise.all([
    page.waitForLoadState('load'),
    firstResult.click()
  ]);

  expect(page.url()).not.toContain('duckduckgo.com');
});
