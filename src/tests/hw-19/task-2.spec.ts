// Task2
// Создайте ОДИН смоук тест со следующими шагами:

// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте, что пользователь успешно зарегистрирован

import test, { expect } from "@playwright/test";

type Country = "USA" | "Canada" | "UK";
type Gender = "Male" | "Female";
type Hobbies = "Movies" | "Travelling" | "Gaming" | "Sports" | "Dancing";
type Skills = "Java" | "JavaScript" | "Python" | "C++" | "Ruby";
type MonthNames =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

interface IUserData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  country: Country;
  gender: Gender;
  language: string;
  skills: Skills[];
  hobbies: Hobbies[];
  birthDate: { day: number; month: MonthNames; year: number };
  password: string;
}

const userInfo: IUserData = {
  firstName: "Val",
  lastName: "Test",
  address: "Roma",
  email: "valTest@test.com",
  phone: "+1154578987351",
  country: "UK",
  gender: "Female",
  language: "English",
  skills: ["JavaScript"],
  hobbies: ["Sports", "Dancing"],
  birthDate: { day: 29, month: "March", year: 1991 },
  password: "123",
};

test.describe("[Registration Form] [Registration]", () => {
  const url = "https://anatoly-karpovich.github.io/demo-registration-form/";

  test("user registration", async ({ page }) => {
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const address = page.locator("#address");
    const emailAddress = page.locator("#email");
    const phone = page.locator("#phone");
    const country = page.locator("#country");
    const gender = page.locator(
      `input[name="gender"][value="${userInfo.gender}"]`
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
    await address.fill(userInfo.address);
    await emailAddress.fill(userInfo.email);
    await phone.fill(userInfo.phone);
    await country.selectOption(userInfo.country);
    await expect(country).toHaveValue(userInfo.country);
    await gender.check();

    for (const hobby of userInfo.hobbies) {
      const hobbies = page.locator(`input[class="hobby"][value = "${hobby}"]`);
      await hobbies.check();
    }

    await language.fill(userInfo.language);

    for (const skill of userInfo.skills) {
      await skills.selectOption(skill);
      await expect(skills).toHaveValue(skill);
    }

    await yearBday.selectOption({ label: userInfo.birthDate.year.toString() });
    await monthBday.selectOption({ label: userInfo.birthDate.month });
    await dayBday.selectOption({ label: userInfo.birthDate.day.toString() });
    await password.fill(userInfo.password);
    await confirmPassword.fill(userInfo.password);

    await submitButton.click();

    await expect(registrationDetails).toHaveText("Registration Details");
    await expect(fullName).toHaveText(
      `${userInfo.firstName} ${userInfo.lastName}`
    );
    await expect(address).toHaveText(userInfo.address);
    await expect(emailAddress).toHaveText(userInfo.email);
    await expect(phone).toHaveText(userInfo.phone);
    await expect(country).toHaveText(userInfo.country);
    await expect(genderOnDetailes).toHaveText(userInfo.gender);
    await expect(language).toHaveText(userInfo.language);
    await expect(skills).toHaveText(userInfo.skills);
    await expect(hobbiesDetails).toHaveText(userInfo.hobbies.join(", "));
    await expect(bDayDate).toHaveText(
      `${userInfo.birthDate.day} ${userInfo.birthDate.month} ${userInfo.birthDate.year}`
    );
  });
});
