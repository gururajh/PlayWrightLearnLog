import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {

  //Go to the website
  await page.goto('http://practicesoftwaretesting.com/');

  //click on email and fill in the email
  await page.locator('[data-test="nav-sign-in"]').click();
  await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
  await page.locator('[data-test="login-submit"]').click();
  await page.locator('[data-test="password"]').fill('welcome01');
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
  await page.locator('[data-test="page-title"]').click();
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
  await page.close()
});