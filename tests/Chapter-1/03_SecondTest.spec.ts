import { test, expect } from '@playwright/test';

test('DuckDuckGo search and click first result', async ({ page, context }) => {
  // Configure longer timeout and more realistic browser behavior
  test.slow(); // Triple the default timeout
  
  await context.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113.0.0.0 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'DNT': '1',
    'Connection': 'keep-alive'
  });

  const query = 'Gururaja Hegde V Senior QA';
  
  // Add retry logic for initial page load
  await test.step('Navigate to DuckDuckGo', async () => {
    let retries = 3;
    while (retries > 0) {
      try {
        await page.goto('https://duckduckgo.com/', { timeout: 30000 });
        break;
      } catch (e) {
        retries--;
        if (retries === 0) throw e;
        await page.waitForTimeout(1000);
      }
    }
  });

  await test.step('Perform search', async () => {
    // More human-like interaction pattern
    await page.mouse.move(100, 100, { steps: 10 });
    await page.waitForTimeout(Math.random() * 500 + 500); // Random delay between 500-1000ms

    // Try multiple possible selectors for search input
    const searchInput = await page.waitForSelector([
      'input[name="q"]',
      'input[type="text"]',
      'input[placeholder*="search"]',
      'input[placeholder*="Search"]'
    ].join(','), { timeout: 10000 });

    // Randomize typing speed for more human-like interaction
    await searchInput.click();
    for (const char of query) {
      await page.keyboard.type(char, { delay: Math.random() * 100 + 50 });
      await page.waitForTimeout(Math.random() * 50);
    }
    
    await page.waitForTimeout(300);
    await page.keyboard.press('Enter');
  });

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
