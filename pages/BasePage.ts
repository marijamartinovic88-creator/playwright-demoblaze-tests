import { Page, Locator, expect } from '@playwright/test';
// Page (veliko P) mora da se importuje jer je TypeScript tip, i time se jasno definiše da je promenljiva page tog tipa (odnosno da ima sve metode i osobine koje Playwright-ov Page objekat ima: goto(), click(), locator(), itd).
// U klasi kao što je BasePage, page je samo referenca / parametar, nema "život" sam po sebi.
// Tek u BaseTest (odnosno u testovima koje pokreće Playwright) taj page postaje stvarni objekat koji Playwright automatski kreira i ubrizgava (fixture).
// expect je direktno Playwright funkcija

export class BasePage {
  
  protected page: Page;



  constructor(page: Page) {
    this.page = page;
  }

//Otvara (navigira na) zadani URL u browseru.

  async navigate(url: string) {
  await this.page.goto(url, { waitUntil: "domcontentloaded"});
  }

// Centralna metoda za čekanje da je stranica spremna za interakciju.
// Koristi 'domcontentloaded' jer je brži i stabilniji od 'networkidle'.
// Nakon toga provjerava da je ključni element vidljiv (UI spreman).


 async waitForDomReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }


  async waitForAppReady(locator: Locator) {
    await this.waitForDomReady();
    await expect(locator).toBeVisible();
  }
// provjeri da su sve slike učitane
async waitForImagesToLoad() {
  await this.page.waitForFunction(() => {
    return Array.from(document.images).every(
      (img) => img.complete && img.naturalWidth > 0
    );
  });

  

  // kratka stabilizaciona pauza
 // await this.page.waitForTimeout(300);
}



//Čeka da određeni element postane vidljiv na stranici.
async waitForVisible(locator: Locator) {
  await expect(locator).toBeVisible();
}

//Unosi tekst u input polje.
async fill(locator: Locator, text: string) {
    await expect(locator).toBeVisible();
    await locator.fill(text);
  }


//Čeka da element bude vidljiv
//Čeka da element bude aktivan
//Scroll do elementa i klikni
// Stabilan klik

  async click(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: 10000 });
    await expect(locator).toBeEnabled({ timeout: 10000 });
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

// provjerava da li element ima određeni tekst
// podržava tačan tekst ili pattern (RegExp)
// možeš je koristiti na bilo kojem locatoru

 async expectText(locator: Locator, text: string | RegExp) {
  await expect(locator).toHaveText(text,  { timeout: 20000 });
}


   //  Kratka pauza za potpuno stabilizovanje UI-a
   async wait(ms: number) {
 await this.page.waitForTimeout(ms);
}

//Pokreće se kada se pojavi JavaScript dialog (alert, confirm, prompt…).
//Moraš ga prihvatiti (accept) ili odbiti (dismiss),
// Handles browser dialog popups (alert, confirm, prompt).
// Automatically accepts the dialog when it appears(click ok/klik na ok)

 async acceptDialogWithMessage(expectedMessage: string) {
   this.page.once("dialog", async dialog =>{
   const message = dialog.message(); 
    expect(message).toContain(expectedMessage);
    await dialog.accept();
  });




  
// Klikne na dugme unutar proizvoda koji sadrži određeni tekst.
// Korisno za stranice gdje se proizvod i dugme nalaze u istoj listi ili kartici.
//async clickButtonInsideProduct(productName: string) {
  //await this.page
   // .getByRole('listitem')
   // .filter({ hasText: productName })
    //.getByRole('button', { name: 'Add to cart' })
   // .click();
//}



  
}}
