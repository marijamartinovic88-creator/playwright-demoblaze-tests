import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {


readonly cartRows: Locator;
readonly placeOrderButton: Locator;

constructor(page: Page) {
    super(page)
    this.cartRows = page.locator("tbody tr");
    this.placeOrderButton = page.getByRole("button", {name: "Place Order"});

}

//Provijera da je korpa otvorena

async cartPageVisible() {
  await this.waitForVisible(this.placeOrderButton);
}

//pronađi sve redove (tr) ili td- celija u redu samo taj element
//zadrži samo red koji sadrži tekst
//provijeri da je proizvod u korpi

  async productVisibleInCart(productName: string) {
    const row =
    this.cartRows.filter({hasText: productName})
    await this.waitForVisible(row);
}

//ovde klikcemo na order Button i otvara nam se stranica za popunjavanje podataka za narucivanje

   async placeOrder() {
   await this.click(this.placeOrderButton);
}









}
