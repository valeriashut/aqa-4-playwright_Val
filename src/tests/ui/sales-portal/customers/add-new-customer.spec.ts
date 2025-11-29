import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import _ from "lodash";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Customers]", async () => {

  let id = "";
  let token = "";

  test.afterEach(async ({ customerApiService }) => {
    if (id) await customerApiService.delete(token, id);
    id = "";
  });

  test("Add new customer with service", 
    {
      tag: [TAGS.UI, TAGS.SMOKE],
    },
    async ({ addNewCustomerUIService, customersListPage, productsListPage }) => {
    token = await productsListPage.getAuthToken();
    await addNewCustomerUIService.open();

    // token = await loginUIService.loginAsAdmin();
    // await homeUIService.openModule("Customers");

    // await addNewCustomerUIService.open();

    const createCustomer = await addNewCustomerUIService.create();
    id = createCustomer._id;
    console.log(id);

    await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
    await expect(customersListPage.tableRowByName(createCustomer.name)).toBeVisible();
  });
});
