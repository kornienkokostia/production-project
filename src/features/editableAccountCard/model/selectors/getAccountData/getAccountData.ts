import { StateSchema } from '@/app/providers/StoreProvider';

export const getAccountData = (state: StateSchema) => state?.account?.data;
