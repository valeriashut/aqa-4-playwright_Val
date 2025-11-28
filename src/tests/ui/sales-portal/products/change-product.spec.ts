import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { expect } from "fixtures/business.fixture";
import { test } from "fixtures";
// Реализовать е2е тест со следующими шагами:
//   - залогиниться
//   - Создать продукт через API
//   - Перейти на страницу Edit Product
//   - Заполнить поля валидными данными
//   - Сохранить продукт
//   - Проверить продукт в таблице
//   - Открыть модалку деталей продукта
//   - Проверить данные в модалке

//   За собой удаляем продукт через апи, разумеется:)


test.describe("[Sales Portal] [Products]", async () => {
    let token = "";
    let id = "";

    test.afterEach(async ({ productsApiService }) => {
        if (id) await productsApiService.delete(token, id);
        id = "";
      });

    test("change product", async ({ loginUIService, productsApiService, homeUIService, productsListUIService, editProductPage, productsListPage }) => {
        token = await loginUIService.loginAsAdmin();
        const editData = generateProductData();

        const createdProduct = await productsApiService.create(token);
        id = createdProduct._id;
        await homeUIService.openModule("Products");
        
        await productsListUIService.editProductModal(createdProduct.name);
        await editProductPage.fillFormWithEdidData(editData);
        await editProductPage.clickSaveChanges();
        await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_EDITED);
        await productsListPage.clickCloseNatification();

        await expect(productsListPage.tableRowByName(editData.name)).toBeVisible();

        await productsListUIService.openDetailsModal(editData.name);
        const actual = await productsListPage.detailsModal.getData();

        productsListUIService.assertDetailsDataAfterEdit(actual, editData);
    });
});

