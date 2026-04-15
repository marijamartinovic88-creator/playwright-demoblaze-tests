import { ProductPage } from '../pages/ProductPage';
import { test, expect } from './BaseTest';
import  type { OrderData }  from '../pages/PlaceOrderPage';


test("TC_07 - Open cart page", async ({ page, homePage, productPage, cartPage}) => {
    await homePage.openProduct("Samsung galaxy s6");
    await productPage.addProductToCart("Samsung galaxy s6");
    await productPage.openCart();
    await cartPage.cartPageVisible();
    await expect(page).toHaveURL(/cart.html/);
    }
);

test("TC_08 - Verify product in cart", async ({ homePage, productPage, cartPage}) => {
  await homePage.openProduct("Samsung galaxy s6");
    await productPage.productVisible("Samsung galaxy s6");
    await productPage.addToCartAndAcceptDialog("Product added");
    await productPage.openCart();
    await cartPage.cartPageVisible();
    await cartPage.productVisibleInCart("Samsung galaxy s6");
       
});




test("TC_09 - Open place order form", async ({homePage, productPage, cartPage, placeOrderPage}) => {
   await homePage.openProduct("Samsung galaxy s6");
    await productPage.productVisible("Samsung galaxy s6");
    await productPage.addToCartAndAcceptDialog("Product added");
    await productPage.openCart();
    await cartPage.cartPageVisible();
    await cartPage.productVisibleInCart("Samsung galaxy s6");
    await cartPage.placeOrder();
    await placeOrderPage.verifyModalIsOpen();
    await placeOrderPage.orderFormFieldsVisible();
});


test("TC_10 - Fill place order form", async ({ homePage, productPage, cartPage, placeOrderPage}) => {
    const orderData: OrderData = {
        name: "Marija",
        country: "Austria",
        city: "Vienna",
        credit: "123456789",
        month: "04",
        year: "2026"
    };

     await homePage.openProduct("Samsung galaxy s6");
    await productPage.productVisible("Samsung galaxy s6");
    await productPage.addToCartAndAcceptDialog("Product added");
    await productPage.openCart();
    await cartPage.cartPageVisible();
    await cartPage.productVisibleInCart("Samsung galaxy s6");
    await cartPage.placeOrder();
    await placeOrderPage.verifyModalIsOpen();
    await placeOrderPage.orderFormFieldsVisible();
    await placeOrderPage.fillOrderForm(orderData);
    await placeOrderPage.veryfyOrderFormValues(orderData);
});


test("TC_11 – Complete purchase", async ({ homePage, productPage, cartPage, placeOrderPage}) => {
  
     const orderData: OrderData = {
        name: "Marija",
        country: "Austria",
        city: "Vienna",
        credit: "123456789",
        month: "04",
        year: "2026"
    };

     await homePage.openProduct("Samsung galaxy s6");
    await productPage.productVisible("Samsung galaxy s6");
    await productPage.addToCartAndAcceptDialog("Product added");
    await productPage.openCart();
    await cartPage.cartPageVisible();
    await cartPage.productVisibleInCart("Samsung galaxy s6");
    await cartPage.placeOrder();
    await placeOrderPage.verifyModalIsOpen();
    await placeOrderPage.orderFormFieldsVisible();
    await placeOrderPage.fillOrderForm(orderData);
    await placeOrderPage.clickPurchase();
    await placeOrderPage.veryfyOrderFormValues(orderData);
    await placeOrderPage.confirmPurchase();
});



test("TC_12 – Post-purchase behavior", async ({page,  homePage, productPage, cartPage, placeOrderPage}) => {
  
     const orderData: OrderData = {
        name: "Marija",
        country: "Austria",
        city: "Vienna",
        credit: "123456789",
        month: "04",
        year: "2026"
    };

     await homePage.openProduct("Samsung galaxy s6");
    await productPage.productVisible("Samsung galaxy s6");
    await productPage.addToCartAndAcceptDialog("Product added");
    await productPage.openCart();
    await cartPage.cartPageVisible();
  //  await cartPage.productVisibleInCart("Samsung galaxy s6");
    await cartPage.placeOrder();
    await placeOrderPage.verifyModalIsOpen();
    await placeOrderPage.orderFormFieldsVisible();
    await placeOrderPage.fillOrderForm(orderData);
    await placeOrderPage.veryfyOrderFormValues(orderData);
    await placeOrderPage.clickPurchase();
   // await placeOrderPage.veryfyOrderFormValues(orderData);
    await placeOrderPage.confirmPurchase();
    await placeOrderPage.successMessageClosed();
    await homePage.openHomePage();
   });






















   