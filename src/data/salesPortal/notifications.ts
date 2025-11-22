export enum NOTIFICATIONS {
  PRODUCT_CREATED = "Product was successfully created",
  PRODUCT_DELETED = "Product was successfully deleted",
  CREATED_FAIL_BAD_REQUEST = "CREATED_FAIL_BAD_REQUEST",
  CREATED_FAIL_INCORRET_REQUEST_BODY = "Incorrect request body"
}

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Not authorized",
  PRODUCT_NOT_FOUND: (id: string) => `Product with id '${id}' wasn't found`,
  PRODUCT_ALREADY_EXISTS: (name: string) => `Product with name '${name}' already exists`,
};