import { test, expect } from "fixtures/business.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { HomePage } from "ui/pages/home.page";
import { LogInPage } from "ui/pages/logIn.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import _, { take } from "lodash";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products]", async () => {

  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test("Add new product with service", 
    {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS],
    }, 
    async ({ addNewProductUIService, productsListPage }) => {
    await addNewProductUIService.open();

    const createProduct = await addNewProductUIService.create();
    id = createProduct._id;
    token = await productsListPage.getAuthToken();

    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(createProduct.name)).toBeVisible();
  });

  test.skip("Add new product",
    {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS],
    }, 
    async ({ page }) => {
    const homePage = new HomePage(page);
    //const loginPage = new LogInPage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    //login page
    // const emailInput = page.locator("#emailinput");
    // const passwordInput = page.locator("#passwordinput");
    // const loginButton = page.locator("button[type='submit']");
    // await homePage.open();

    // // await expect(emailInput).toBeVisible();
    // // await emailInput.fill(credentials.username);
    // // await passwordInput.fill(credentials.password);
    // // await loginButton.click();
    // await loginPage.fillCredentials(credentials);
    // await loginPage.clickLogInButton();

    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  });

  test.skip ("e2e HW-22 test",
    {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS],
    }, 
    async({ page }) => {
//Открыть Sales Portal локально поднятый в докере
//Войти в приложения используя учетные данные указанные в readme к проекту
//Создать продукт (модуль Products)
//Верифицировать появившуюся нотификацию
//Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)

    const homePage = new HomePage(page);
    // const loginPage = new LogInPage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);
    const firstRowInTable = page.locator("//tbody/tr[1]");
    const productData = generateProductData();
    
    // await homePage.open();
    // await loginPage.fillCredentials(credentials);
    // await loginPage.clickLogInButton();
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
    const productFromTable = await productsListPage.getProductData(productData.name);
    const actualProductData = _.omit(productFromTable, ['createdOn']);
    const expectedProductData = _.omit(productData, ['amount', 'notes']);
    expect(actualProductData).toEqual(expectedProductData);
  });
});

//locators !
//waiterForPage !
//product data generator
//teardown