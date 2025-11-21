import { APIResponse, expect } from "@playwright/test";
import { IResponse, IResponseFields } from "data/types/core.types";
import { validateJsonSchema } from "./validateSchema.utils";

export function validateResponse<T extends IResponseFields | null>(
  response: IResponse<T>,
  expected: {
    status: number;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;
    schema?: object;
  },
) {
  expect.soft(response.status).toBe(expected.status);
  if (expected.IsSuccess) expect.soft(response.body!.IsSuccess).toBe(expected.IsSuccess);
  if (expected.ErrorMessage) expect.soft(response.body!.ErrorMessage).toBe(expected.ErrorMessage);
  if (expected.schema) validateJsonSchema(response.body!, expected.schema);
}


export async function validateResponseLogIN(
  response: APIResponse,
  expected: {
    status: number;
    schema?: object;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;
  },
) {
  expect.soft(response.status(), `Response status should be ${expected.status}`).toBe(expected.status);
  const body = await response.json();
  if (body) {
    if (expected.schema) validateJsonSchema(body, expected.schema!);
    expect.soft(body.IsSuccess, `IsSuccess should be ${expected.IsSuccess}`).toBe(true);
    expect.soft(body.ErrorMessage, `ErrorMessage should be ${expected.ErrorMessage}`).toBe(null);
  }
}
