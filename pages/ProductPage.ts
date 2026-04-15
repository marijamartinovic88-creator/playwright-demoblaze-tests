import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {

readonly productTitle: Locator;
readonly addToCartLink: Locator;
readonly cartLink: Locator;

constructor(page: Page) {
    super(page);

    this.productTitle = page.locator(".name");
    this.addToCartLink = page.getByRole("link", { name: "Add to cart"});
    this.cartLink = page.getByRole("link", { name: "Cart", exact: true });
}

 async addProductToCart(productName: string) {
   await this.productVisible(productName);
    await this.acceptDialogWithMessage("Product added");
 }


// Ovde pozivamo metodu iz BasaPage kako bi product bio vidljiv
    async productVisible(productName: string) {
        await this.expectText(this.productTitle,productName);
    }

// za popup windows koji se pojavljuje kada dodamo proizvod
    async addToCart() {
      await this.click(this.addToCartLink);
    }

    async openCart() {
        await this.click(this.cartLink);
    }


async addToCartAndAcceptDialog(expectedMessage: string) {
    const [dialog] = await Promise.all([this.page.waitForEvent("dialog"),
   this.addToCart()]);
    expect(dialog.message()).toContain(expectedMessage);
    await dialog.accept();
  }





}




















    
