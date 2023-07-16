import { Country } from '@/entities/Country';
import { Currancy } from '@/entities/Currency';

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
