import {test as setup,expect} from "@playwright/test"
import { isContext } from "vm";
setup("Create customer 01 auth",async({page, context})=>
    
{

    const email = "customer@practicesoftwaretesting.com";

    const password = "welcome01";

    const customer01AuthFile=".auth/customer01.json";

    await page.goto("https://practicesoftwaretesting.com/auth/login")

    //fill the email
    await page.getByTestId("email").fill(email);
    // fill the password
    await page.getByTestId("password").fill(password);
    
    //click submit
    await page.getByTestId("login-submit").click();

    //Assert the user name is logged in
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
    
    //This line saves the current browser context’s authentication/session state 
    // — like cookies, local storage, etc. — to a JSON file on your system.
    await context. storageState({ path: customer01AuthFile });
});