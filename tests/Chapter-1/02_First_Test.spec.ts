

// import a playwright module
import { test, expect } from '@playwright/test'


// write a test
test('MyFirstPlaywright TS Test', async ({ page }) => {

    // Go to url
    await page.goto("https://www.google.com");
       
    // Search with keywords
    await page.getByRole('combobox', { name: 'Search' }).fill('Gururaja  Hegde V Senior QA');
    await page.getByRole('combobox', { name: 'Search' }).press('Enter')

    //Click on First Link 
    await page.getByRole('link', { name: 'Gururaj Hegde - Senior QA' }).first().click();

    //Validate Web Page Title 
    await expect(page).toHaveTitle('Gururaj Hegde')


   // await page.getByRole('img').nth(2).click()
   // await page.locator('class="LC20lb MBeuO DKV0Md"').click()
   // await expect(page).toHaveTitle('Gururaj Hegde')await page.getByRole('combobox', { name: 'Search' }).click();
    






})


// go to url


// search with keywords


// click on your linkedin Profile link


// validate web page title with my name.