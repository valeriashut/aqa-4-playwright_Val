import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
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
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS, TAGS.UI],
    }, 
    async ({ addNewProductUIService, productsListPage }) => {
    token = await productsListPage.getAuthToken();
    
    await addNewProductUIService.open();

    const createProduct = await addNewProductUIService.create();
    id = createProduct._id;
    token = await productsListPage.getAuthToken();

    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(createProduct.name)).toBeVisible();
  });

  test("Add new product",
    {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS, TAGS.UI],
    }, 
    async ({ page, productsListPage, productsListUIService }) => {
      token = await productsListPage.getAuthToken();
      await productsListUIService.open();
    const addNewProductPage = new AddNewProductPage(page);
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  });

  test ("e2e HW-22 test",
    {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS, TAGS.UI],
    }, 
    async({ page, productsListPage, productsListUIService }) => {
//Открыть Sales Portal локально поднятый в докере
//Войти в приложения используя учетные данные указанные в readme к проекту
//Создать продукт (модуль Products)
//Верифицировать появившуюся нотификацию
//Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)

    token = await productsListPage.getAuthToken();
    await productsListUIService.open();
    const addNewProductPage = new AddNewProductPage(page);
    const firstRowInTable = page.locator("//tbody/tr[1]");
    const productData = generateProductData();
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