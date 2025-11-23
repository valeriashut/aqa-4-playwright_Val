import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import _ from "lodash";

test.describe("[Sales Portal] [Customers]", async () => {

  let id = "";
  let token = "";

  test.afterEach(async ({ customerApiService }) => {
    if (id) await customerApiService.delete(token, id);
    id = "";
  });

  test("Add new product with service", async ({ loginUIService, homeUIService, addNewCustomerUIService, customersListPage }) => {
    token = await loginUIService.loginAsAdmin();
    await homeUIService.openModule("Customers");

    await addNewCustomerUIService.open();

    const createCustomer = await addNewCustomerUIService.create();
    id = createCustomer._id;
    console.log(id);

    await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
    await expect(customersListPage.tableRowByName(createCustomer.name)).toBeVisible();
  });
});
