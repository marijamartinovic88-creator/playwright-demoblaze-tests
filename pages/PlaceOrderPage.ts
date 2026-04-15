import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
//import { allowedNodeEnvironmentFlags } from 'node:process';

//Type je ime za tip podataka 
//(npr. string, number, funkcija ili objekat).
//Često ga koristimo da definišemo strukturu objekta 
//kako bi kod bio pregledniji i lakši za održavanje.

export type OrderData = {
    name: string;
    country: string;
    city: string;
    credit: string;
    month: string;
    year: string;
}

export class PlaceOrderPage extends BasePage {

readonly orderModal: Locator;
readonly placeOrderTitle: Locator;
readonly nameInput: Locator;
readonly countryInput: Locator;
readonly cityInput: Locator;
readonly creditCardInput: Locator;
readonly monthInput: Locator;
readonly yearInput: Locator;
readonly purchaseInput: Locator;
readonly successMessage: Locator;
readonly okButton: Locator;

constructor(page: Page) {
    super(page)
    this.orderModal = page.locator("#orderModal");
    this.placeOrderTitle = page.locator("#orderModalLabel");
    this.nameInput = page.locator("#name");
    this.countryInput = page.locator("#country");
    this.cityInput = page.locator("#city");
    this.creditCardInput = page.locator("#card");
    this.monthInput = page.locator("#month");
    this.yearInput = page.locator("#year");
    this.purchaseInput = page.getByRole("button", {name: "Purchase"});
    this.successMessage = page.getByText("Thank you for your purchase!");
    this.okButton = page.getByRole("button", {name: "OK"});
}



 async orderFormFieldsVisible() {
    await this.waitForVisible(this.nameInput);
    await this.waitForVisible(this.countryInput);
    await this.waitForVisible(this.cityInput);
    await this.waitForVisible(this.creditCardInput);
    await this.waitForVisible(this.monthInput);
    await this.waitForVisible(this.yearInput);

}



//čekaj da je naslov (Place Order modal) VIDLJIV
//provjeri da tekst tog elementa tačno sadrži "Place order"

async verifyModalIsOpen() {
    await this.waitForVisible(this.placeOrderTitle);
    await this.expectText(this.placeOrderTitle, /Place order/i);
}


async fillOrderForm(order: OrderData) {
    await this.fill(this.nameInput, order.name);
    await this.fill(this.countryInput, order.country);
    await this.fill(this.cityInput, order.city);
    await this.fill(this.creditCardInput, order.credit);
    await this.fill(this.monthInput, order.month);
    await this.fill(this.yearInput, order.year);
    }
//koristi BasePage → stabilan klik
//skriva locator (purchaseInput)
//možeš je koristiti na više mjesta

    async clickPurchase() {
        await this.click(this.purchaseInput);
    }

// Izvršava osnovni proces naručivanja:
// 1. Popunjava formu
// 2. Klikće na Purchase dugme
// Ne uključuje provjeru uspješne kupovine niti potvrdu (OK)

//async completeOrder(order: OrderData) {
     //   await this.fillOrderForm(order);
     //   await this.clickPurchase();
   // }
     
    async verifyPurchaseSuccess() {
  await this.waitForVisible(this.successMessage);
  await this.expectText(this.successMessage, /Thank you for your purchase!/i);
}

async confirmPurchase() {
  await this.click(this.okButton);
}


// Završava kompletan proces naručivanja:
// uključuje popunjavanje forme, klik na Purchase,
// provjeru uspješne poruke i potvrdu klikom na OK

async completeOrderAndConfirm(order: OrderData) {
  await this.fillOrderForm(order);
  await this.clickPurchase();
  await this.verifyPurchaseSuccess();
  await this.confirmPurchase();
}
//Validacija: provjerava da li su podaci ispravno upisani u sva polja forme

async veryfyOrderFormValues(order: OrderData) {
    await expect(this.nameInput).toHaveValue(order.name);
    await expect(this.countryInput).toHaveValue(order.country);
    await expect(this.cityInput).toHaveValue(order.city);
    await expect(this.creditCardInput).toHaveValue(order.credit);
    await expect(this.monthInput).toHaveValue(order.month);
    await expect(this.yearInput).toHaveValue(order.year)

}


async successMessageClosed() {
await expect(this.successMessage).not.toBeVisible();


}




}
