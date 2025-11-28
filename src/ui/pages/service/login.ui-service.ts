import { Page } from "@playwright/test";
import { credentials } from "config/env";
import { ICredentials } from "data/types/credentials.types";
import { HomePage } from "ui/pages/home.page";
import { LogInPage } from "../logIn.page";

export class LoginUIService {
  homePage: HomePage;
  loginPage: LogInPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.loginPage = new LogInPage(page);
  }

  async loginAsAdmin() {
    return await this.login(credentials);
  }

  async login(credentials: ICredentials) {
    await this.loginPage.open();
    await this.loginPage.fillCredentials(credentials);
    await this.loginPage.clickLogInButton();
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
    return token;
  }
}