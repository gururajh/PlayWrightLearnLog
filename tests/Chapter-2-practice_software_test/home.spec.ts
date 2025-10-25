import { test, expect} from '@playwright/test'


test ("Home page", async({page}) => {

    await page.goto("https://practicesoftwaretesting.com/") 
    //ensure the signin link is present

        expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
        //check the title of the page
         await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");

        //check the count of items displayed 
        const productGrid = page.locator(".col-md-9"); // the dot indicates the class inside locator
        await expect(productGrid.getByRole("link")).toHaveCount(9)// locator assertion
        expect(await productGrid.getByRole("link").count()).toBe(9);


        //Search for "Thor Hammer"
        await page.locator('[data-test="search-query"]').fill("Thor Hammer")
        await page.locator('[data-test="search-submit"]').click()
        await expect(productGrid.getByRole("link")).toHaveCount(1)
        // Check for the product by its name instead of ID since IDs can change
        await expect(page.getByRole('link', { name: /Thor.*Hammer/i })).toBeVisible()
        //Check the result in the grid


})
