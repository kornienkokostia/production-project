import { Country, Currancy } from 'shared/const/common';

export interface Account {
  firstname: string,
  lastname: string
  age: number,
  currency: Currancy,
  country: Country,
  city: string,
  username: string,
  avatar: string
}

export interface AccountSchema {
  data?: Account;
  isLoading: boolean;
  error?: string
  readonly: boolean
}
