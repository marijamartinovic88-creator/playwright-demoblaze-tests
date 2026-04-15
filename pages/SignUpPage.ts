import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignUpPage extends BasePage {

  readonly username: Locator;
  readonly password: Locator;
  readonly signUpButton: Locator;

constructor(page: Page) {
    super(page);
    this.username = page.locator("#sign-username");
    this.password = page.locator("#sign-password")
    this.signUpButton = page.getByRole("button", {name: "Sign up"});

}

  async signUp(user: string, pass: string) {
  await this.fill(this.username, user);
  await this.fill(this.password, pass);
  await this.click(this.signUpButton);
}

//popup windows and message
  async assertSignUpSuccess() {
    await this.acceptDialogWithMessage("Sign up successful.");
  }




















}