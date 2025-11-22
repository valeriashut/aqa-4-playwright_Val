// Создайте 3 интеграционных теста для проверки следующих метрик на странице Home:
// 1. Orders This Year
// 2. New Customers
// 3. Canceled Orders

// Для реализации подмокивайте респонс эндпоинта metrics

//   - Orders This Year: Metrics.orders.totalOrders
//   - New Customers: Metrics.customers.totalNewCustomers
//   - Canceled Orders: Metrics.orders.totalCanceledOrders

import { SALES_PORTAL_URL } from "config/env";
import { generateMetricData } from "data/salesPortal/generateMetrictData";
import { test, expect } from "fixtures/business.fixture";




test.describe("[Integration] [Sales Portal] [Home Page]", () => {
  test("Metrics totalOrdersValue", async ({ loginAsAdmin, homePage, mock, page }) => {

    const mockBody = generateMetricData();
    const totalOrdersValue = mockBody.orders.totalOrders;  
    
    await mock.homePageMetrics({
      ErrorMessage: null,
      IsSuccess: true,
      Metrics: mockBody,
    });

    await loginAsAdmin();
    await page.goto(SALES_PORTAL_URL + "home");
    await homePage.waitForOpened();
    expect(homePage.metricsOrdersThisYear).toContainText(String(totalOrdersValue));
  });

  test("Metrics totalNewCustomer", async ({ loginAsAdmin, homePage, mock, page }) => {

    const mockBody = generateMetricData();
    const totalNewCustomer = mockBody.customers.totalNewCustomers;  
    
    await mock.homePageMetrics({
      ErrorMessage: null,
      IsSuccess: true,
      Metrics: mockBody,
    });

    await loginAsAdmin();
    await page.goto(SALES_PORTAL_URL + "home");
    await homePage.waitForOpened();
    expect(homePage.metricsNewCustomers).toContainText(String(totalNewCustomer));
  });

  test("Metrics totalCanceledOrder", async ({ loginAsAdmin, homePage, mock, page }) => {

    const mockBody = generateMetricData();
    const totalCanceledOrder = mockBody.orders.totalCanceledOrders;  
    
    await mock.homePageMetrics({
      ErrorMessage: null,
      IsSuccess: true,
      Metrics: mockBody,
    });

    await loginAsAdmin();
    await page.goto(SALES_PORTAL_URL + "home");
    await homePage.waitForOpened();
    expect(homePage.metricsCanceledOrders).toContainText(String(totalCanceledOrder));
  });
});