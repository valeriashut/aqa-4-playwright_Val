import { expect, test } from "fixtures/business.fixture";
import _ from "lodash";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products]", () => {
    let token = "";
    let id = "";

    test("Table parsing", 
        {
            tag: [TAGS.REGRESSION, TAGS.UI, TAGS.VISUAL_REGRESSION],
        },
    async ({ page, productsListUIService, productsApiService, productsListPage }) => {
    // const productListPage = new ProductsListPage(page);
    // const addNewProductPage = new AddNewProductPage(page);
    const firstRowInTable = page.locator("//tbody/tr[1]");
    // const productData = generateProductData();
    
    token = await productsListPage.getAuthToken();
    const product = await productsApiService.create(token);
    id = product._id;
    await productsListUIService.open();
    // await productsListPage.clickAddNewProduct();
    // await addNewProductPage.waitForOpened();
    // await addNewProductPage.fillForm(productData);
    // await addNewProductPage.clickSave();
    // await productsListPage.waitForOpened();
    // await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(firstRowInTable).toContainText(product.name);
    // await expect(firstRowInTable).toContainText(productData.name);
    //const productFromTable = await productsListPage.getProductInf(productData.name);
    
    await expect.soft(productsListPage.nameCell(product.name)).toHaveText(product.name);
    await expect.soft(productsListPage.priceCell(product.name)).toHaveText(`$${product.price.toString()}`);
    await expect.soft(productsListPage.manufacturerCell(product.name)).toHaveText(product.manufacturer);
    // await expect.soft(productsListPage.createdOnCell(productData.name)).toHaveText("");

    const productFromTable = await productsListPage.getProductData(product.name);
    const expectedProductData = _.omit(product, ['amount', 'notes', '_id', 'createdOn']);
    const actualProductData = _.omit(productFromTable, ['createdOn']);
    expect(actualProductData).toEqual(expectedProductData);

    const tableData = await productsListPage.getTableData();
    await productsApiService.delete(token, id);
    });
});