
interface ICredentials {
  username: string;
  password: string;
}

interface IUserData {
  title: string;
  credentials: ICredentials;
  successMessage: string;
}

enum NOTIFICATIONS  {
    REGISTER_FAIL_INVALID_VALUES = "Please, provide valid data",
    REGISTER_FAIL_USERNAME_MIN =  "Username should contain at least 3 characters",
    REGISTER_FAIL_USERNAME_EMPTY = "Username is required",
    REGISTER_FAIL_PASSWORD_MIN = "Password should contain at least 8 characters",
    REGISTER_FAIL_PASSWORD_EMPTY = "Password is required",
}
 
const invalidTestData: IUserData[] = [
  {
    credentials: { username: " ", password: " " },
    successMessage: NOTIFICATIONS.REGISTER_FAIL_INVALID_VALUES,
    title: "Submit registration with spaces in username, password fialds",
  },
  {
    credentials: { username: "Va", password: "aB345678" },
    successMessage: NOTIFICATIONS.REGISTER_FAIL_USERNAME_MIN,
    title: "Submit registration with username less then min",
  },
  {
    credentials: { username: "", password: "aB345678" },
    successMessage: NOTIFICATIONS.REGISTER_FAIL_USERNAME_EMPTY,
    title: "Submit registration with empty username",
  },
  {
    credentials: { username: "Val323ewe", password: "aB3456" },
    successMessage: NOTIFICATIONS.REGISTER_FAIL_PASSWORD_MIN,
    title: "Submit registration with password less then min",
  },
  {
    credentials: { username: "Qwertuyugfregretre234sdjh123465487649_@1!", password: "" },
    successMessage: NOTIFICATIONS.REGISTER_FAIL_PASSWORD_EMPTY,
    title: "Submit registration with empty password",
  },
];

export default invalidTestData;