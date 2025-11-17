 // Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
  //   - с негативыми проверками

import { invalidTestDataForProduct } from "api/api/creatProductsDDT.api";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.shema";
import { STATUS_CODES } from "data/statusCodes";
import { expect, test } from "fixtures/api.fixture";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";

  //   Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт - удаляйте его.
  
  //   Требования:
  //   Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
  //   Manufacturer: обязательное
  //   Price: обязательное, Price should be in range 1-99999
  //   Amount: обязательное, Amount should be in range 0-999
  //   Notes: Notes should be in range 0-250 and without < or > symbols




test.describe("[API] [Sales Portal] [Products Negative test]", () => {
  let token = '';
  let id = '';

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

for (const { title, productData, successMessage, statusCode } of invalidTestDataForProduct) {
  test(title, async ({ productsApi }) => {
    const createdProduct = await productsApi.create(productData, token);
    validateResponse(createdProduct, {
      status: statusCode,
      IsSuccess: false,
      ErrorMessage: successMessage,
    });
  });
}

test("Create Product with same name", async ({ productsApi }) => {
    const productData = generateProductData();
    const createdProduct = await productsApi.create(productData, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);

    const createdProductWithSameName = await productsApi.create(productData, token);
    validateResponse(createdProductWithSameName, {
      status: STATUS_CODES.CONFLICT,
      IsSuccess: false,
      ErrorMessage: `Product with name '${productData.name}' already exists`,
    });
  });
});



// test.describe('[API] [Sales Portal] [Products]', () => {
//   let token = '';

//   test.beforeAll(async ({ loginApiService }) => {
//     token = await loginApiService.loginAsAdmin();
//   });

//   for (const { testName, data } of dataForInvalidCases) {
//     test(`Verify ${testName}`, async ({ productsApi }) => {
//       const productData = { ...generateProductData(), ...data };
//       console.log('data', data);
//       console.log('productData', productData);
//       const createdProduct = await productsApi.create({ ...productData, ...data }, token);
//       validateResponse(createdProduct, {
//         status: STATUS_CODES.BAD_REQUEST,
//         IsSuccess: false,
//         ErrorMessage: 'Incorrect request body',
//       });
//     });
//   }

//   test(`Verify name should be unique`, async ({ productsApi }) => {
//     const productData = generateProductData();
//     await productsApi.create(productData, token);
//     const createdProduct = await productsApi.create(productData, token);
//     validateResponse(createdProduct, {
//       status: STATUS_CODES.CONFLICT,
//       IsSuccess: false,
//       ErrorMessage: `Product with name '${productData.name}' already exists`,
//     });
//   });
// });