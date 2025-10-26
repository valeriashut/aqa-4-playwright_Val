// Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

//   Требования:
//     Страница регистрации:
//       Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//       Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
//     Страница логина:
//       Username: обязательное
//       Password: обязательное


import test, { expect } from "@playwright/test";

interface ICredentials {
    username: string;
    password: string;
}

enum NOTIFICATIONS  {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    REGISTER_FAIL_INVALID_VALUES = "Please, provide valid data",
    REGISTER_FAIL_USERNAME_MIN =  "Username should contain at least 3 characters",
    REGISTER_FAIL_USERNAME_EMPTY = "Username is required",
    REGISTER_FAIL_PASSWORD_MIN = "Password should contain at least 8 characters",
    REGISTER_FAIL_PASSWORD_EMPTY = "Password is required",
}

test.describe("[AnatolyKarpovich site] [Registration form]", () => {

    const validCredentials: ICredentials = {
        username: "Val",
        password: "aB345678"
    }

    const invalidCredentials: ICredentials[] = [{
        username: " ",
        password: " "
    },
    {
        username: "Va",
        password: "aB345678"
    },
    {
        username: "",
        password: "aB345678"
    },
    {
        username: "Val323ewe",
        password: "aB3456"
    },
    {
        username: "Qwertuyugfregretre234sdjh123465487649_@1!",
        password: ""
    }]

    test.beforeEach(async ({ page }) => {

        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        const registerButton = page.locator("#registerOnLogin");
        const loginPageTitle = page.locator("#loginForm");
        const registerPageTitle = page.locator("#registerForm");

        await page.goto(url);
        await expect(loginPageTitle).toHaveText("Login");
        await registerButton.click();
        await expect(registerPageTitle).toHaveText("Registration");
    })

    test("Submit registration form with valid credentials", async ({ page })=>{

        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerationButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");

        await usernameInput.fill(validCredentials.username)
        await passwordInput.fill(validCredentials.password)

        await registerationButton.click();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
    });

    test("Submit registration with spaces in username, password fialds", async ({ page })=>{
 
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerationButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const { username, password } = invalidCredentials[0]!;

        await usernameInput.fill(username);
        await passwordInput.fill(password);

        await registerationButton.click();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_INVALID_VALUES);
    });

    test("Submit registration with username less then min", async ({ page })=>{
 
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerationButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const { username, password } = invalidCredentials[1]!;

        await usernameInput.fill(username);
        await passwordInput.fill(password);

        await registerationButton.click();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_USERNAME_MIN);
    });

    test("Submit registration with empty username", async ({ page })=>{
 
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerationButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const { username, password } = invalidCredentials[2]!;

        await usernameInput.fill(username);
        await passwordInput.fill(password);

        await registerationButton.click();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_USERNAME_EMPTY);
    });

    test("Submit registration with password less then min", async ({ page })=>{
 
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerationButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const { username, password } = invalidCredentials[3]!;

        await usernameInput.fill(username);
        await passwordInput.fill(password);

        await registerationButton.click();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_PASSWORD_MIN);
    });

    test("Submit registration with empty password", async ({ page })=>{
 
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerationButton = page.locator("#register");
        const notification = page.locator("#errorMessageOnRegister");
        const { username, password } = invalidCredentials[4]!;

        await usernameInput.fill(username);
        await passwordInput.fill(password);

        await registerationButton.click();
        await expect(notification).toHaveText(NOTIFICATIONS.REGISTER_FAIL_PASSWORD_EMPTY);
    });
})
