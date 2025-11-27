// Создайте 3 интеграционных теста для проверки следующих метрик на странице Home:
// 1. Orders This Year
// 2. New Customers
// 3. Canceled Orders

// Для реализации подмокивайте респонс эндпоинта metrics

//   - Orders This Year: Metrics.orders.totalOrders
//   - New Customers: Metrics.customers.totalNewCustomers
//   - Canceled Orders: Metrics.orders.totalCanceledOrders
import { generateMetricData } from "data/salesPortal/generateMetrictData";
import { TAGS } from "data/tags";
import { test, expect } from "fixtures/business.fixture";




test.describe("[Integration] [Sales Portal] [Home Page]", () => {
  let token = "";

  test("Metrics totalOrdersValue", 
    {
      tag: [TAGS.UI],
    },
    async ({ homePage, mock, productsListPage, homeUIService }) => {

    const mockBody = generateMetricData();
    const totalOrdersValue = mockBody.orders.totalOrders;  
    
    await mock.homePageMetrics({
      ErrorMessage: null,
      IsSuccess: true,
      Metrics: mockBody,
    });

    token = await productsListPage.getAuthToken();
    await homeUIService.open();

    expect(homePage.metricsOrdersThisYear).toContainText(String(totalOrdersValue));
  });

  test("Metrics totalNewCustomer", 
    {
      tag: [TAGS.UI],
    },
    async ({ homePage, mock, productsListPage, homeUIService }) => {

    const mockBody = generateMetricData();
    const totalNewCustomer = mockBody.customers.totalNewCustomers;  
    
    await mock.homePageMetrics({
      ErrorMessage: null,
      IsSuccess: true,
      Metrics: mockBody,
    });

    token = await productsListPage.getAuthToken();
    await homeUIService.open();

    expect(homePage.metricsNewCustomers).toContainText(String(totalNewCustomer));
  });

  test("Metrics totalCanceledOrder", 
    {
      tag: [TAGS.UI],
    },
    async ({ homePage, mock, productsListPage, homeUIService }) => {

    const mockBody = generateMetricData();
    const totalCanceledOrder = mockBody.orders.totalCanceledOrders;  
    
    await mock.homePageMetrics({
      ErrorMessage: null,
      IsSuccess: true,
      Metrics: mockBody,
    });

    token = await productsListPage.getAuthToken();
    await homeUIService.open();

    expect(homePage.metricsCanceledOrders).toContainText(String(totalCanceledOrder));
  });
});