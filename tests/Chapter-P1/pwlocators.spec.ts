

// page.getByRole() to locate by explicit and implicit accessibility attributes.
// page.getByText() to locate by text content.
// page.getByLabel() to locate a form control by associated label's text.
// page.getByPlaceholder() to locate an input by placeholder.
// page.getByAltText() to locate an element, usually image, by its text alternative.
// page.getByTitle() to locate an element by its title attribute.
// page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).


import { test, expect, Locator} from '@playwright/test';


test("Verify AllPlaywrightLocators",async ({page})=>{

    await page.goto("https://practicesoftwaretesting.com/");
    // images have alt property

    // page.getByAltText()
    // identified images(and similar element) based on the alt attribute.
    // use this locator when your elemetns support alt text such as image and area elements.

    const logo:Locator=page.getByAltText("Banner")
    // await statement is used when the statement is returning a promise
    // await statement is used when action is being done on the element.
    await expect(logo).toBeVisible();


    // getByText  - Find an element by the text it contains .you can match by substring/ exact string
    // locate by visible text
    // use this locator to find non interactive elements like div, span,p, etc.
    // for interactive elements like button,a,input,use role locators.


    //const text:Locator=page.getByText("This is a DEMO application")
    await expect(page.getByText("This is a DEMO application")).toBeVisible(); // full string
    await expect(page.getByText("This is a")).toBeVisible(); // provided sub string.


    // page.getByRole - locating by role ( role is not an attribute)
    // role locatore include buttoms,checkboxes, heading,links,tables.
    // and many more and follow W3C specifications for ARIA role.
    // Prefet for interactive elements like buttons, checkboxes,links,





    

})


 

