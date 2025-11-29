import { test, expect } from "fixtures/api.fixture";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";

test.describe("[API] [Sales Portal] [Products]", () => {
  test("Delete Product", 
    {
      tag: [TAGS.API]
    },
    async ({ loginApiService, productsApiService, productsApi }) => {
    //arrange
    const token = await loginApiService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    const id = createdProduct._id;
    //act
    const response = await productsApi.delete(id, token);
    //assert
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });

//   test("delete product", async ({ logInPage, homePage, productsListPage, addNewProductPage  }) => {
//         await logInPage.open();
//         await logInPage.fillCredentials(credentials);
//         await logInPage.clickLogInButton();
//         await homePage.waitForOpened();
//         await homePage.clickOnViewModule("Products");
//         await productsListPage.waitForOpened();
//         await productsListPage.clickAddNewProduct();
//         await addNewProductPage.waitForOpened();
//         const productData = generateProductData();
//         await addNewProductPage.fillForm(productData);
//         await addNewProductPage.clickSave();
//         await productsListPage.waitForOpened();
//         await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
//         await productsListPage.clickCloseNatification();
//         await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
//         const productFromTable = await productsListPage.getProductData(productData.name);
//         const expectedProduct = _.omit(productData, ["amount"], ["notes"]);
//         const actualProduct = _.omit(productFromTable, ["createdOn"]);
//         expect(expectedProduct).toEqual(actualProduct);
//         await productsListPage.deleteButton(productData.name).click();
//         const { deleteModal } = productsListPage;
//         await deleteModal.waitForOpened();
//         await expect(deleteModal.title).toBeVisible();
//         await expect(deleteModal.message).toBeVisible();
//         await deleteModal.clickDeleteButton();
//         await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED); 
//         await productsListPage.clickCloseNatification();
//         await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible();
//     });
});

