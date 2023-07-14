import { Country } from 'entities/Country/model/types/country';
import { Currancy } from 'entities/Currency/model/types/currency';

export interface Account {
  id?: string;
  firstname?: string,
  lastname?: string
  age?: number,
  currency?: Currancy,
  country?: Country,
  city?: string,
  username?: string,
  avatar?: string
}
