import { test, expect} from '@playwright/test'

test.describe("Home Page without auth",() =>{
    test.beforeEach(async ({page}) =>{
        await page.goto("https://practicesoftwaretesting.com/") 
});
test("visual test",async({page}) => {
    await expect(page).toHaveScreenshot("home-page-no-auth.png");
});
test ("Check Sign in", async({page}) => 
    {
        expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
    });
    test("validate Page Title",async({page})=>
    {
        //check the title of the page
        await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
    })


    test ('Product Validation',async({page})=>{

        //check the count of items displayed 
        const productGrid = page.locator(".col-md-9"); // the dot indicates the class inside locator
        await expect(productGrid.getByRole("link")).toHaveCount(9)// locator assertion
        expect(await productGrid.getByRole("link").count()).toBe(9);


    })

    test("Search for Thor Hammer",async({page})=>{
        //Search for "Thor Hammer"
        const productGrid = page.locator(".col-md-9"); // the dot indicates the class inside locator
        // await page.locator('[data-test="search-query"]').fill("Thor Hammer")
        await page.getByTestId("search-query").fill("Thor Hammer");
        // await page.locator('[data-test="search-submit"]').click()
        await page.getByTestId("search-submit").click()
        await expect(productGrid.getByRole("link")).toHaveCount(1)
        await expect(page.getByAltText("Thor Hammer")).toBeVisible()
        //Check the result in the grid




    })

})


test.describe("Home Page customer 01 auth",()=>{

    test.use({storageState: ".auth/customer01.json"});
    test.beforeEach(async ({page})=>{

        await page.goto("https://practicesoftwaretesting.com")
    })
    test ("check customer 01 is signed in",async({page})=>{

        await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
        await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
    });

});
