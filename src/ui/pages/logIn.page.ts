// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import { credentials } from "config/env";
import { ICredentials } from "data/types/credentials.types";
import { SalesPortalPage } from "./salesPortal.page";

export class LogInPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");
  readonly uniqueElement = this.emailInput;
  
  async fillCredentials(credatial: ICredentials): Promise<void> {
    await this.emailInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
}

    async clickLogInButton() {
    await this.loginButton.click();
}
}