import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";

type HomeModuleButton = "Products" | "Customers" | "Orders";

export class HomePage extends SalesPortalPage {
  readonly welcomeText = this.page.locator(".welcome-text");
  readonly productsButton = this.page.locator("#products-from-home");
  readonly customersButton = this.page.locator("#customers-from-home");
  readonly ordersButton = this.page.locator("#orders-from-home");
  readonly metricsOrdersThisYear = this.page.locator("#total-orders-container");
  readonly metricsNewCustomers = this.page.locator("#total-customers-container");
  readonly metricsCanceledOrders = this.page.locator("#canceled-orders-container");
  readonly uniqueElement = this.welcomeText;

  async clickOnViewModule(module: HomeModuleButton) {
    const moduleButtons: Record<HomeModuleButton, Locator> = {
      Products: this.productsButton,
      Customers: this.customersButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[module].click();
  }
}