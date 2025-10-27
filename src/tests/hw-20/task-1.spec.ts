// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!


import { expect, test } from "@playwright/test";

enum NOTIFICATIONS {
  GONE = "It's gone!",
  BACK = "It's back!",
}

test.describe("[Heroku App] [Dynamic controls]", () => {
  test("HW20", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    const dynamicControlsLink = page.locator('a[href="/dynamic_controls"]');
    await page.goto(url);
    await dynamicControlsLink.click();

    const removeButton = page.locator("//button[text()='Remove']");
    const pageTitle = page.locator("//h4[1]");
    const checkBox = page.locator("//input[@type='checkbox']");
    const addButton = page.locator("//button[text()='Add']");
    const messageText = page.locator("//p[@id='message']");

    await expect(removeButton).toBeVisible({ timeout: 15000 });
    await expect(pageTitle).toHaveText('Dynamic Controls');
    await checkBox.click();
    await removeButton.click();
    await expect(checkBox).toBeHidden({ timeout: 15000 });
    await expect(addButton).toBeVisible({ timeout: 15000 });
    await expect(messageText).toContainText(NOTIFICATIONS.GONE)
    await addButton.click();
    await expect(checkBox).toBeVisible({ timeout: 15000 });
    await expect(messageText).toContainText(NOTIFICATIONS.BACK)
  });
});