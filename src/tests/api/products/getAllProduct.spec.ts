// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
//   - Залогиниться
//   - Создать продукт и проверить 201й статус
//   - Получить все продукты
//   - создать и проверить схему
//   - проверить статус
//   - проверить, что в массиве тела респонса есть созданный продукт
//   - Проверить поля IsSuccess и ErrorMessage


import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.shema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { getAllProductSchema } from "data/schemas/products/getAll.shema";
import { TAGS } from "data/tags";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test("Smoke for all products (without filter parameters)", 
    {
      tag: [TAGS.API, TAGS.PRODUCTS, TAGS.SMOKE],
    },
    async ({ loginApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
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

   //TODO: Получить все продукты
    const getProductResponse = await productsApi.getAll(token);
    validateResponse(getProductResponse, {
        status: STATUS_CODES.OK,
        schema: getAllProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
        });

    //проверить, что в массиве тела респонса есть созданный продукт
    const allproduct = JSON.stringify(getProductResponse.body.Products);
    const product = JSON.parse(allproduct).find((product: { _id: string; }) => product._id === id);
    expect(product).toMatchObject({...productData});
  });
 });

// import test, { expect, request } from "@playwright/test";
// import { apiConfig } from "config/apiConfig";
// import { credentials } from "config/env";
// import { generateProductData } from "data/salesPortal/products/generateProductData";
// import { loginSchema } from "data/schemas/login.schema";
// import { createProductSchema } from "data/schemas/products/create.shema";
// import { getAllProductSchema } from "data/schemas/products/getAll.shema";
// import { STATUS_CODES } from "data/statusCodes";
// import _ from "lodash";
// import { validateResponse } from "utils/validation/validateResponse.utils";

// const { baseURL, endpoints } = apiConfig;

// test.describe("[API] [Sales Portal] [LogIn]", () => {

// test("Smoke for all products (without filter parameters)", async ({ request }) => {
//   const loginResponse = await request.post(baseURL + endpoints.login, {
//     data: credentials,
//     headers: {
//       "content-type": "application/json",
//       },
//     });
//     validateResponse(loginResponse, {
//     status: STATUS_CODES.OK,
//     schema: loginSchema,
//     IsSuccess: true,
//     ErrorMessage: null,
//   });
//     const headers = loginResponse.headers();
//     const token = headers["authorization"]!;
//     expect(token).toBeTruthy();

//     //TODO: create product
//         const productData = generateProductData();
//         const createProductResponse = await request.post(baseURL + endpoints.products, {
//           data: productData,
//           headers: {
//             "content-type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
  
//         const createProductBody = await createProductResponse.json();
//         await validateResponse(createProductResponse, {
//           status: STATUS_CODES.CREATED,
//           schema: createProductSchema,
//           IsSuccess: true,
//           ErrorMessage: null,
//         });
    
//         const actualProductData = createProductBody.Product;
    
//         expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
    
//         const id = actualProductData._id;

//         //TODO: Получить все продукты
        
//             const getProductResponse = await request.get(baseURL + endpoints.productsAll, {
//               headers: {
//                 "content-type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             });
//             const getProductBody = await getProductResponse.json();
//             await validateResponse(getProductResponse, {
//               status: STATUS_CODES.OK,
//               schema: getAllProductSchema,
//               IsSuccess: true,
//               ErrorMessage: null,
//             });

//             //проверить, что в массиве тела респонса есть созданный продукт

// //const product = getProductBody.Products.find((product: { _id: string; }) => product._id === id);

//             const product = getProductBody.Products.find((i: { _id: any; }) => i._id === id);
//             const productWithId = {...productData, _id: id};
//             expect(_.omit(product, ["createdOn"])).toEqual(productWithId);

//             const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     expect(response.status()).toBe(STATUS_CODES.DELETED);
//   });


// });

