import { expect, Page } from "@playwright/test";
import _ from "lodash";
import { CustomersListPage } from "../customers/customersList.page";
import { AddNewCustomerPage } from "../customers/addNewCustomer.page";
import { ICustomer, ICustomerResponse } from "data/types/customer.types";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { apiConfig } from "config/apiConfig";
import { STATUS_CODES } from "data/statusCodes";

export class AddNewCustomerUIService {
    customersListPage: CustomersListPage;
    addNewCustomerPage: AddNewCustomerPage;

  constructor(private page: Page) {
    this.customersListPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  async open() {
    await this.addNewCustomerPage.open("customers/add");
    await this.addNewCustomerPage.waitForOpened();
  }

  async create(customerData?: Partial<ICustomer>) {
    const data = generateCustomerData(customerData);
    await this.addNewCustomerPage.fillForm(data);
    const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse, any>(
      apiConfig.endpoints.customers,
      this.addNewCustomerPage.clickSave.bind(this.addNewCustomerPage),
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Customer, "_id", "createdOn")).toEqual(data);

    await this.customersListPage.waitForOpened();
    return response.body.Customer;
  }
}