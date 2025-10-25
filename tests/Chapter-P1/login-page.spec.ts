import { test, expect } from '@playwright/test'; 

// 👈 Import necessary functions from Playwright test runner


// Define a test suite or group of related tests.
// The string 'Navigation and Sign In Verification' is the name that will appear in test reports.
test('Navigate to sign-in page and verify elements', async ({ page }) => {

    // 1. Navigate to the page.
    console.log('Step 1: Navigating to the website.');
    // The 'page' fixture is Playwright's core object for controlling the browser tab.
    await page.goto('https://practicesoftwaretesting.com/');

    // 2. Check if you are in the home page.
    // [Data/Proof] Checking for the page title and a core 'Home' link element.
    await test.step('Verify Home Page loaded', async () => {
        // Assertion 1: Verify the browser tab title is correct. This is your proof of landing on the right site.
        await expect(page).toHaveTitle(/Practice Software Testing/);

        // Assertion 2: Verify a key element on the Home page is visible.
        // getByRole is the recommended, resilient way to find elements, mimicking user behavior (looking for a 'Home' link).
        await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
        console.log('Step 2: Successfully verified Home Page.');
    });

    // 3. Click on Sign in.
    console.log('Step 3: Clicking on the "Sign in" link.');
    // Find the link with the text 'Sign in' and click it.
    await page.getByRole('link', { name: 'Sign in' }).click();

    // 4. Check if you have reached the signin page. - by checking the text- "Login" to be visible
    // [Data/Proof] Checking for the 'Login' heading on the new page.
    await test.step('Verify Sign-in Page loaded', async () => {
        // Locate the element that has the text "Login" and is likely a main heading (Role 'heading').
        const loginHeading = page.getByRole('heading', { name: 'Login' });

        // Assertion 3: Verify the "Login" heading element is visible. This proves the page changed correctly.
        // Playwright will automatically wait (autowait) for this element to appear before failing the test.
        await expect(loginHeading).toBeVisible();
        console.log('Step 4: Successfully verified "Login" heading is visible.');
    });

});