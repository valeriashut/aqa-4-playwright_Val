// // Написать смоук API тест на логин
// //   - создать и проверить схему
// //   - проверить статус
// //   - проверить наличие токена в хедерах

import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { loginSchema } from "data/schemas/login.schema";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import _ from "lodash";
import { validateResponseLogIN } from "utils/validation/validateResponse.utils";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [LogIn]", () => {
  
  test("log in", 
    {
      tag: [TAGS.API],
    },
    async ({ request }) => {

    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    const loginBody = await loginResponse.json();
    console.log(loginBody);
    await validateResponseLogIN(loginResponse, {
      status: STATUS_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    expect.soft(loginBody.User.username).toBe(credentials.username);
    const headers = loginResponse.headers();
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();
  });
});

