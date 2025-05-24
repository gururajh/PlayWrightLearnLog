import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

    // Go to QA Practice Website
await test.step('Visit_QAPractice_Site',async() =>{
                await page.goto('https://qa-practice.netlify.app') 
                console.log("URL Opened successfully")
                await page.waitForTimeout(1000);
                await page.getByRole('link', { name: 'Ecommerce - Login, Add to' }).click()
                await expect(page.getByRole('heading', { name: 'Login - Shop' })).toBeVisible()
                console.log("Ecommerce Page reached")
                await page.waitForTimeout(1000);
});

await test.step('LoginToEcommerce',async() =>{
        // Enter the user name and password as shown below
        //Please use credentials Email: admin@admin.com
        //Password: admin123
        await page.getByRole('textbox', { name: 'Email' }).fill('admin@admin.com')
        await page.waitForTimeout(1000);
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
        await page.waitForTimeout(1000);
        await page.getByRole('button', { name: 'Submit' }).click()
        await expect(page.getByRole('heading', { name: 'SHOPPING CART' })).toBeVisible()
        console.log("Shopping Cart Page reached")
})

await test.step('ShoppingCart',async() =>{
       //  Shopping Cart reached - Add Samsung Galaxy A32 to Cart.
       // Add Huawei Mate 20 Lite to Cart.
       await page.getByRole('button', { name: 'ADD TO CART' }).nth(1).click()
       await page.waitForTimeout(1000);
       await page.getByRole('button', { name: 'ADD TO CART' }).nth(2).click()
       await page.waitForTimeout(1000);
       await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click()
       await page.waitForTimeout(2000);


})
await test.step('ShippingDetail',async() =>{
       //  Enter Phone number,Street,City,Country
       // Click on Submit.
       await page.getByRole('textbox', { name: 'Enter phone number' }).fill("3458973457")
       await page.waitForTimeout(1000);
       await page.getByRole('textbox', { name: 'Little Streets' }).fill("8th Cross, Indiana")
       await page.waitForTimeout(1000);
       console.log("Filled the value Street ")
       await page.getByRole('textbox', { name: 'London' }).fill("Louisiana")
       await page.waitForTimeout(1000);
       console.log("Filled the value City ")
       //await page.selectOption('#countries_dropdown_menu', { value: 'Andorra' });
       console.log("Select the value Andorra in the Country Pull Down.")


       await page.selectOption('#countries_dropdown_menu', { value: 'Andorra' });
       await page.waitForTimeout(1000);
       const selectedValue = await page.$eval('#countries_dropdown_menu', el => (el as HTMLSelectElement).value);
       expect(selectedValue).toBe('Andorra');

}) 

})












