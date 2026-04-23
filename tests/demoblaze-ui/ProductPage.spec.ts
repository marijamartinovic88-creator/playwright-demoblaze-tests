import { test, expect } from './BaseTest';

test("TC_05 - user can open selected product details from homepage", async ({ productPage, homePage }) => {
    await homePage.openProduct("Samsung galaxy s6");
    await productPage.productVisible("Samsung galaxy s6");
   // await productPage.addToCart();
    //await productPage.openCart();
});


test("TC_06 - user can add product to cart", async ({ productPage, homePage }) => {
     await homePage.openProduct("Samsung galaxy s6");
    await productPage.productVisible("Samsung galaxy s6");
    await productPage.addToCartAndAcceptDialog("Product added");
    }
);



