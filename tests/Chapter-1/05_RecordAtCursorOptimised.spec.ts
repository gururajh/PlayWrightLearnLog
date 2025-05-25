import { test, expect } from '@playwright/test';

test('QA Practice E2E Test - Login, Add to Cart, Checkout', async ({ page }) => {

  // STEP 1: Launch site and navigate to Ecommerce section
  await test.step('Navigate to Ecommerce Section from Home Page', async () => {
    await page.goto('https://qa-practice.netlify.app');
    console.log("✅ Home page loaded");

    await page.getByRole('link', { name: 'Ecommerce - Login, Add to' }).click();
    await expect(page.getByRole('heading', { name: 'Login - Shop' })).toBeVisible();
    console.log("✅ Reached Ecommerce Login page");
  });

  // STEP 2: Perform login
  await test.step('Login with Valid Credentials', async () => {
    await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('heading', { name: 'SHOPPING CART' })).toBeVisible();
    console.log("✅ Logged in and Shopping Cart is visible");
  });

  // STEP 3: Add products to cart
  await test.step('Add Products to Cart and Proceed to Checkout', async () => {
    // Wait for all "ADD TO CART" buttons to be visible
    const addToCartButtons = await page.locator('button', { hasText: 'ADD TO CART' }).all();

    // Debug: Print count
    console.log(`🛒 Found ${addToCartButtons.length} 'ADD TO CART' buttons`);

    // Check if enough products are available
    expect(addToCartButtons.length).toBeGreaterThanOrEqual(2);

    // Click on the first two available buttons
    await addToCartButtons[0].click();
    await addToCartButtons[1].click();

    console.log("✅ Added two products to the cart");

    // Proceed to checkout
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    await expect(page.getByText('Shipping Details')).toBeVisible(); // Adjust based on your page
    console.log("✅ Moved to Checkout page");
  });

  // STEP 4: Fill in shipping details
  await test.step('Enter Shipping Information and Select Country', async () => {
    await page.getByRole('textbox', { name: 'Enter phone number' }).fill("3458973457");
    await page.getByRole('textbox', { name: 'Little Streets' }).fill("8th Cross, Indiana");
    console.log("📬 Street filled");

    await page.getByRole('textbox', { name: 'London' }).fill("Louisiana");
    console.log("🌆 City filled");

    // Wait for dropdown to be populated
   await page.waitForSelector('#countries_dropdown_menu'); // wait for dropdown itself

    // Select by visible label
    await page.selectOption('#countries_dropdown_menu', { label: 'Andorra' });;
    console.log("🌍 Country 'Andorra' selected");

    const selectedValue = await page.$eval('#countries_dropdown_menu', el => (el as HTMLSelectElement).value);
    expect(selectedValue).toBe('Andorra');
    console.log("✅ Country selection validated");
  });

});
