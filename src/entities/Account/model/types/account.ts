import { Country } from "entities/Country/model/types/country";
import { Currancy } from "entities/Currency/model/types/currency";

export interface Account {
  firstname?: string,
  lastname?: string
  age?: number,
  currency?: Currancy,
  country?: Country,
  city?: string,
  username?: string,
  avatar?: string
}

export interface AccountSchema {
  data?: Account;
  form?: Account;
  isLoading: boolean;
  error?: string
  readonly: boolean
}

export interface AccountErrors {
  firstname?: boolean,
  lastname?: boolean,
  age?: boolean,
  city?: boolean,
  username?: boolean,
}