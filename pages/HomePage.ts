import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

  readonly productsLogo: Locator;
  readonly homeLink: Locator;
  readonly contactLink: Locator;
  readonly aboutUsLink: Locator;
  readonly cartLink: Locator
  readonly logInLink: Locator;
  readonly signUpLink: Locator;
  readonly logoutLink: Locator;
 

  constructor(page: Page) {
    super(page);
    this.productsLogo = page.getByRole("link", { name: "PRODUCT STORE"});
    this.homeLink = page.getByRole("link", { name: /Home/ });
    this.contactLink = page.getByRole("link", { name: "Contact"});
    this.aboutUsLink = page.getByRole("link", { name: "About us"});
    this.cartLink = page.getByRole("link", { name: "Cart"});
    this.logInLink = page.getByRole("link", { name: "Log in"});
    this.signUpLink = page.getByRole("link", {name: "Sign up"});
    this.logoutLink = page.getByRole("link", {name: "Log out"});
    }

 async openHomePage() {
 await this.navigate("https://www.demoblaze.com/");
  }

    // Provjerava da je Home stranica učitana.
// Ne čekamo cijelu stranicu, već ključni element (products logo),

  async homePageLoaded() {
  await this.waitForAppReady(this.productsLogo);
}
 // samo ako treba
//await homePage.waitForImagesToLoad();


async assertMenuVisible() {
    await this.waitForVisible(this.homeLink);
    await this.waitForVisible(this.contactLink);
    await this.waitForVisible(this.aboutUsLink);
    await this.waitForVisible(this.cartLink);
    await this.waitForVisible(this.logInLink);
    await this.waitForVisible(this.signUpLink);

  }

async openProduct(productName: string) {
  await this.click(this.page.getByRole("link", { name: productName, exact: true}));
}
//klikni na login 
async openLogIn() {
await this.click(this.logInLink);
}


async openSignup() {
await this.click(this.signUpLink);
}



async logout() {
  await this.click(this.logoutLink);
}

async assertLoggedOut () {
  await this.waitForVisible(this.logInLink);
  }

  
//znam da nema potrebe i da mogu u HomePage podesiti, ali sam vijezbala
//async timeOut() {
 // await this.wait(10000);
//}

}
