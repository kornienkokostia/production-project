import { Account } from "entities/Account";
import { AccountErrors } from "../../types/EditableAccountCardSchema";

export const validateAccountData = (account: Account) => {
  const {
    firstname, lastname, age, city, username,
  } = account;

  const errors: AccountErrors = {
    firstname: false,
    lastname: false,
    age: false,
    city: false,
    username: false,
  };

  firstname?.length === 0 ? errors.firstname = true : false;
  lastname?.length === 0 ? errors.lastname = true : false;
  age! === 0 ? errors.age = true : false;
  city?.length === 0 ? errors.city = true : false;
  username?.length === 0 ? errors.username = true : false;

  return errors;
};
