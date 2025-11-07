// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }
// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

// Сайт: https://the-internet.herokuapp.com/tables

import test, { expect, Page } from "@playwright/test";
import expectedTable from "./table.data";

async function getTableRow(page: Page, email: string) {
    const table = page.locator("#table2");
    const headersLocators = await table.locator("th").all();
    headersLocators.pop()
    const headers = await Promise.all(headersLocators.map((el) => el.innerText()));
    const rowLocator = table.locator("tbody tr").filter({ hasText: email })
    const cellLocator = await rowLocator.locator("td").all();
    const cell = await Promise.all(cellLocator.map(el => el.innerText()));

    const rowData = headers.reduce <Record<string, string>> ((result, header, i) => {
        result[header] = cell[i] ?? "";
        i++;
        return result;
    }, {});
    console.log(rowData);
    return rowData;
}

test.describe("Table row information", () => {
    test.beforeEach(async ({ page }) => {
        const url = "https://the-internet.herokuapp.com/tables";
        await page.goto(url);
        await expect(page).toHaveURL(url);
        await expect(page.locator("h3")).toHaveText("Data Tables");
    });

    for(const tablerow of expectedTable) {
      test(`Find information from a table by email ${tablerow.Email!}`, async ({ page }) => {
        const getTable = await getTableRow(page, tablerow.Email!);
        expect(getTable, `Expected table row should be equal to actual ${tablerow}`).toEqual(tablerow);})
    };
  });



