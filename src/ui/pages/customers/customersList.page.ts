import { SalesPortalPage } from "../salesPortal.page";


export class CustomersListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly tableRow = this.page.locator("tbody tr");
  readonly addNewCustomerButton = this.page.locator('[name="add-button"]');
  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });
  
  readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);
  
  readonly nameCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(0);
  readonly priceCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(1);
  readonly manufacturerCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(2);
  
  readonly uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }
}