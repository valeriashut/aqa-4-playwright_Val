import { expect, Page } from "@playwright/test";
import _ from "lodash";
import { CustomersListPage } from "../customers/customersList.page";
import { AddNewCustomerPage } from "../customers/addNewCustomer.page";

export class ProductsListUIService {
  customersListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;

  constructor(private page: Page) {
    this.customersListPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  async openAddNewCustomerPage() {
    await this.customersListPage.clickAddNewCustomer();
    await this.addNewCustomerPage.waitForOpened();
  }

}
  

