import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  //readonly da ne bi kasnije u izvršavanju koda dolazilo do promena vrednosti lokatora
  //Moramo navesti kog tipa su lokatori jer koristimo TypeScript a po njemu je tip Locator
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly welcomeUser: Locator;
  
  

// Svaki test ima poseban "živi" page koji Playwright automatski kreira.
// Kreiranjem lokatora unutar konstruktora obezbeđuje se da objekti pages klasa
// budu povezani sa upravo tim page-om specifičnim za dati test.
// Svaki test ima svoje odvojene page objekte u kojima se nalazi page jedinstven za taj test.

  constructor(page: Page) {
    super(page);
    this.username = page.locator("#loginusername");
    this.password = page.locator("#loginpassword");
    this.loginButton = page.getByRole("button", { name: "Log in"});
    this.welcomeUser = page.getByText(/Welcome/i);
     }

  //TypeScript je tipiziran tako da moramo navesti kog tipa su user i pass
  //Za async funkcije nema void ako ne vraća nijedan tip podatka


  async login(user: string, pass: string) {
  await this.fill(this.username, user);
  await this.fill(this.password, pass);
  await this.click(this.loginButton);
}

  

  
  async assertLoggedInSuccess() {
   await this.waitForVisible(this.welcomeUser);
 }


 



//async assertLoginFailed() {
 // await expect(this.loginButton).toBeVisible();
 // await expect(this.welcomeUser).not.toBeVisible();
//}



}