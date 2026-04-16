import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { PlaceOrderPage } from '../pages/PlaceOrderPage';
//import { BasePage } from '../pages/BasePage';


 // const BASE_URL = 'https://www.demoblaze.com/';


  //Navodimo promenljive i kog su tipa, koristimo ih kasnije u ovom fajlu
type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  signUpPage: SignUpPage;
  productPage : ProductPage;
  cartPage : CartPage;
  placeOrderPage: PlaceOrderPage;
  
  };


  //Proširujemo test sa objektima pages klasa, koristimo Fixtures da se zna kog su tipa loginPage, homePage...
const test = base.extend<Fixtures>({
  loginPage: async function ({ page }, use) {
    await use(new LoginPage(page));
  },
  homePage: async function ({ page }, use) {
    await use(new HomePage(page));
  },
  signUpPage: async function ({ page }, use) {
    await use(new SignUpPage(page));
  },
  productPage: async function ({ page }, use) {
    await use(new ProductPage(page));
  },
  cartPage: async function ({ page }, use) {
    await use(new CartPage(page));
  },
  placeOrderPage: async function ({ page }, use) {
    await use(new PlaceOrderPage(page));
  },
});


//test.beforeEach(async ({ page, homePage }) => {
//  await homePage.openHomePage();
 // await homePage.homePageLoaded();
//});

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.demoblaze.com/index.html", { waitUntil: "domcontentloaded"});
  await expect(page.getByRole("link", { name: "Log in"})).toBeVisible();
});


test.afterEach(async ({ homePage }) => {
 if (await homePage.logoutLink.isVisible()) {
   await homePage.logout();
    await homePage.assertLoggedOut();
  }

});


export { test, expect };
//Radimo export da u drugim fajlovima/klasama možemo da koristimo proširenu test funkciju (base), expect samo da bi smo pisali jednu liniju koda za import















