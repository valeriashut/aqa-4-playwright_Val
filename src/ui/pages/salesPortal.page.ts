import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";

export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");
  readonly closeNatificationButton = this.page.locator(".toast-container button.btn-close")
  abstract readonly uniqueElement: Locator;

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: 10000 });
    await this.waitForSpinners();
  }
  async waitForSpinners() {
    await expect(this.spinner).toHaveCount(0, { timeout: 10000 });
  }

  async open(route?: string) {
    await this.page.goto(SALES_PORTAL_URL + route);
  }

  async clickCloseNatification() {
    await this.closeNatificationButton.click();
    await expect(this.toastMessage).not.toBeVisible(); 
  }
}