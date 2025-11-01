// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
// Страница логина:
//   Username: обязательное
//   Password: обязательное

import test, { expect } from "@playwright/test";
import userinvalidTestData from "./register.data";

test.describe("[Demo Login Form] Registration", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";

  for (const { title, credentials, successMessage } of userinvalidTestData) {
    test(title, async ({ page }) => {
      await page.goto(url);
      const registerOnLoginButton = page.locator('.loginForm input[value="Register"]');
      await expect(registerOnLoginButton).toBeVisible();
      await registerOnLoginButton.click();
      const registerForm = page.locator(".registerForm");
      const registerFormTitle = registerForm.locator("#registerForm");
      await expect(registerFormTitle).toBeVisible();
      const userNameInput = registerForm.locator("input[type='text']");
      const passwordInput = registerForm.locator("input[type='password']");
      const registerButton = registerForm.locator(`input[type='submit']`);
      const successMessageLabel = registerForm.locator("h4");
      const { username, password } = credentials;
      await userNameInput.fill(username);
      await passwordInput.fill(password);
      await registerButton.click();
      await expect(successMessageLabel).toHaveText(successMessage);
    });
  }
});