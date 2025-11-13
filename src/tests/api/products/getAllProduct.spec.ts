// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
//   - Залогиниться
//   - Создать продукт и проверить 201й статус
//   - Получить все продукты
//   - создать и проверить схему
//   - проверить статус
//   - проверить, что в массиве тела респонса есть созданный продукт
//   - Проверить поля IsSuccess и ErrorMessage

import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { loginSchema } from "data/schemas/login.schema";
import { createProductSchema } from "data/schemas/products/create.shema";
import { getAllProductSchema } from "data/schemas/products/getAll.shema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [LogIn]", () => {

test("Smoke for all products (without filter parameters)", async ({ request }) => {
  const loginResponse = await request.post(baseURL + endpoints.login, {
    data: credentials,
    headers: {
      "content-type": "application/json",
      },
    });
    await validateResponse(loginResponse, {
          status: STATUS_CODES.OK,
          schema: loginSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
    const headers = loginResponse.headers();
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    //TODO: create product
        const productData = generateProductData();
        const createProductResponse = await request.post(baseURL + endpoints.products, {
          data: productData,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const createProductBody = await createProductResponse.json();
        await validateResponse(createProductResponse, {
          status: STATUS_CODES.CREATED,
          schema: createProductSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });
    
        const actualProductData = createProductBody.Product;
    
        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
    
        const id = actualProductData._id;

        //TODO: Получить все продукты
        
            const getProductResponse = await request.get(baseURL + endpoints.productsAll, {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            const getProductBody = await getProductResponse.json();
            await validateResponse(getProductResponse, {
              status: STATUS_CODES.OK,
              schema: getAllProductSchema,
              IsSuccess: true,
              ErrorMessage: null,
            });

            //проверить, что в массиве тела респонса есть созданный продукт
            const product = getProductBody.Products.find((i: { _id: any; }) => i._id === id);
            const productWithId = {...productData, _id: id};
            expect(_.omit(product, ["createdOn"])).toEqual(productWithId);

            const response = await request.delete(`${baseURL}${endpoints.productById(id)}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    expect(response.status()).toBe(STATUS_CODES.DELETED);
  });


});

