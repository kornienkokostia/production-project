import { Account } from '@/entities/Account';

export interface AccountErrors {
  firstname?: boolean,
  lastname?: boolean,
  age?: boolean,
  city?: boolean,
  username?: boolean,
}

export interface AccountSchema {
  data?: Account;
  form?: Account;
  isLoading: boolean;
  error?: string
  readonly: boolean
  formErrors?: AccountErrors
}
