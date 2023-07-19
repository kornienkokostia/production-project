import { Account } from '@/entities/Account';
import { AccountErrors } from '@/shared/types/account';

export interface AccountSchema {
  data?: Account;
  form?: Account;
  isLoading: boolean;
  error?: string
  readonly: boolean
  formErrors?: AccountErrors
}
