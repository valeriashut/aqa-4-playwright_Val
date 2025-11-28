import {
  test as base,
  expect,
  // Page
} from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { LogInPage } from "ui/pages/logIn.page";
import { HomeUIService } from "ui/pages/service/home.ui-service";
import { ProductsListUIService } from "ui/pages/service/productsList.ui-service";
import { AddNewProductUIService } from "ui/pages/service/addNewProduct.ui-service";
import { LoginUIService } from "ui/pages/service/login.ui-service";
import { EditProductModal } from "ui/pages/products/editProduct.page";
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { AddNewCustomerUIService } from "ui/pages/service/addNewCustomer.ui-service";


export interface IPages {
  //pages
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  logInPage: LogInPage;
  editProductPage: EditProductModal;
  customersListPage: CustomersListPage;

  //ui-services
  homeUIService: HomeUIService;
  productsListUIService: ProductsListUIService;
  addNewProductUIService: AddNewProductUIService;
  loginUIService: LoginUIService;
  addNewCustomerUIService: AddNewCustomerUIService;
}

export const test = base.extend<IPages>({
  //pages
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },
  logInPage: async ({ page }, use) => {
    await use(new LogInPage(page));
  },
  editProductPage: async ({ page }, use) => {
    await use(new EditProductModal(page));
  },
  customersListPage: async ({ page }, use) => {
    await use(new CustomersListPage(page));
  },

  //ui-services
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },
  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },
  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },
  loginUIService: async ({ page }, use) => {
  await use(new LoginUIService(page));
  },
  addNewCustomerUIService: async ({ page }, use) => {
  await use(new AddNewCustomerUIService(page));
  }
});

export { expect };