import test, { expect } from "@playwright/test"
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { HomePage } from "ui/pages/home.page";
import { LogInPage } from "ui/pages/logIn.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";

test.describe("[Sales Portal] [Products]", () => {
    test("Table parsing", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LogInPage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);
    const firstRowInTable = page.locator("//tbody/tr[1]");
    const productData = generateProductData();
    
    await homePage.open();
    await loginPage.fillCredentials(credentials);
    await loginPage.clickLogInButton();
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(firstRowInTable).toContainText(productData.name);
    //const productFromTable = await productsListPage.getProductInf(productData.name);
    
    await expect.soft(productsListPage.nameCell(productData.name)).toHaveText(productData.name);
    await expect.soft(productsListPage.priceCell(productData.name)).toHaveText(`$${productData.price.toString()}`);
    await expect.soft(productsListPage.manufacturerCell(productData.name)).toHaveText(productData.manufacturer);
    // await expect.soft(productsListPage.createdOnCell(productData.name)).toHaveText("");

    const productFromTable = await productsListPage.getProductData(productData.name);
    const expectedProductData = _.omit(productData, ['amount', 'notes']);
    const actualProductData = _.omit(productFromTable, ['createdOn']);
    expect(actualProductData).toEqual(expectedProductData);
    //expect(productFromTable).toMatchObject(expectedProductData);

    const tableData = await productsListPage.getTableData();
    console.log(tableData);
    });
});