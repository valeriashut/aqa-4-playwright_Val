import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";

test.describe("[Sales Portal] [Products]", () => {
  //test with fixtures version 1
  test("Product Details", async ({ loginAsAdmin, homePage, productsListPage, addNewProductPage }) => {
    //login page
    // const emailInput = page.locator("#emailinput");
    // const passwordInput = page.locator("#passwordinput");
    // const loginButton = page.locator("button[type='submit']");
    // await homePage.open();
    // await expect(emailInput).toBeVisible();
    // await emailInput.fill(credentials.username);
    // await passwordInput.fill(credentials.password);
    // await loginButton.click();
    // await homePage.waitForOpened();
    await loginAsAdmin();
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
    await productsListPage.detailsButton(productData.name).click();
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();
    const actual = await detailsModal.getData();
    expect(_.omit(actual, ["createdOn"])).toEqual(productData);
  });

  //test with fixtures version 2
  // test("Product Details", async ({ page, pages }) => {
  //   const { homePage, productsListPage, addNewProductPage } = pages;
  //   //login page
  //   const emailInput = page.locator("#emailinput");
  //   const passwordInput = page.locator("#passwordinput");
  //   const loginButton = page.locator("button[type='submit']");
  //   await homePage.open();
  //   await expect(emailInput).toBeVisible();
  //   await emailInput.fill(credentials.username);
  //   await passwordInput.fill(credentials.password);
  //   await loginButton.click();
  //   await homePage.waitForOpened();
  //   await homePage.clickOnViewModule("Products");
  //   await productsListPage.waitForOpened();
  //   await productsListPage.clickAddNewProduct();
  //   await addNewProductPage.waitForOpened();
  //   const productData = generateProductData();
  //   await addNewProductPage.fillForm(productData);
  //   await addNewProductPage.clickSave();
  //   await productsListPage.waitForOpened();
  //   await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
  //   await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  //   await productsListPage.detailsButton(productData.name).click();
  //   const { detailsModal } = productsListPage;
  //   await detailsModal.waitForOpened();
  //   const actual = await detailsModal.getData();
  //   expect(_.omit(actual, ["createdOn"])).toEqual(productData);
  // });


//   Создайте e2e тест со следующими шагами:
// 1. Зайти на сайт Sales Portal
// 2. Залогиниться с вашими кредами
// 3. Перейти на страницу Products List
// 4. Перейти на станицу Add New Product
// 5. Создать продукта
// 6. Проверить наличие продукта в таблице
// 7. Кликнуть на кнопку "Delete" в таблице для созданного продукта
// 8. В модалке удаления кликнуть кнопку Yes, Delete
// 9. Дождаться исчезновения модалки и загрузки страницы
// 10. Проверить, что продукт отсутствует в таблице

// Вам понадобится:

// - PageObject модалки удаления продукта
// - Подключить модалку в PageObject страницы Products
// - Использовать фикстуры


});