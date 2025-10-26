// Task2
// Создайте ОДИН смоук тест со следующими шагами:

// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте, что пользователь успешно зарегистрирован

import test, { expect } from "@playwright/test";

test.describe("[Registration Form] [Registration]", () => {
  test("user registration", async ({ page }) => {
    const userInfo = {
      firstName: "Val",
      lastName: "Test",
      Address: "Roma",
      Email: "valTest@test.com",
      Phone: "+1154578987351",
      Country: "UK",
      Gender: "female",
      Language: "English",
      Skills: ["JavaScript"],
      Hobbies: ["Sports", "Dancing"],
      yearBday: "1991",
      monthBday: "March",
      dayBday: "29",
      Password: "123",
    };

    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";

    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const address = page.locator("#address");
    const emailAddress = page.locator("#email");
    const phone = page.locator("#phone");
    const country = page.locator("#country");
    const gender = page.locator(
      `input[name="gender"][value="${userInfo.Gender}"]`
    );
    const genderOnDetailes = page.locator("#gender");
    const language = page.locator("#language");
    const skills = page.locator("#skills");
    const hobbiesDetails = page.locator("#hobbies");
    const yearBday = page.locator("#year");
    const monthBday = page.locator("#month");
    const dayBday = page.locator("#day");
    const bDayDate = page.locator("#dateOfBirth");

    const password = page.locator("#password");
    const confirmPassword = page.locator("#password-confirm");

    const submitButton = page.locator("//button[text()='Submit']");
    const registrationDetails = page.locator("h2");
    const fullName = page.locator("#fullName");

    await page.goto(url);

    await firstName.fill(userInfo.firstName);
    await lastName.fill(userInfo.lastName);
    await address.fill(userInfo.Address);
    await emailAddress.fill(userInfo.Email);
    await phone.fill(userInfo.Phone);
    await country.selectOption(userInfo.Country);
    await expect(country).toHaveValue(userInfo.Country);
    await gender.check();

    for (const hobby of userInfo.Hobbies) {
      const hobbies = page.locator(`input[class="hobby"][value = "${hobby}"]`);
      await hobbies.check();
    }

    await language.fill(userInfo.Language);

    for (const skill of userInfo.Skills) {
      await skills.selectOption(skill);
      await expect(skills).toHaveValue(skill);
    }

    await yearBday.selectOption(userInfo.yearBday);
    await expect(yearBday).toHaveValue(userInfo.yearBday);
    await monthBday.selectOption(userInfo.monthBday);
    await expect(monthBday).toHaveValue(userInfo.monthBday);
    await dayBday.selectOption(userInfo.dayBday);
    await expect(dayBday).toHaveValue(userInfo.dayBday);

    await password.fill(userInfo.Password);
    await confirmPassword.fill(userInfo.Password);

    await submitButton.click();

    await expect(registrationDetails).toHaveText("Registration Details");
    await expect(fullName).toHaveText(
      `${userInfo.firstName} ${userInfo.lastName}`
    );
    await expect(address).toHaveText(userInfo.Address);
    await expect(emailAddress).toHaveText(userInfo.Email);
    await expect(phone).toHaveText(userInfo.Phone);
    await expect(country).toHaveText(userInfo.Country);
    await expect(genderOnDetailes).toHaveText(userInfo.Gender);
    await expect(language).toHaveText(userInfo.Language);
    await expect(skills).toHaveText(userInfo.Skills);
    await expect(hobbiesDetails).toHaveText(userInfo.Hobbies.join(", "));
    await expect(bDayDate).toHaveText(
      `${userInfo.dayBday} ${userInfo.monthBday} ${userInfo.yearBday}`
    );
  });
});
