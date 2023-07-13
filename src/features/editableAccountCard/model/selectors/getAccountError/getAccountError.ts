import { StateSchema } from 'app/providers/StoreProvider';

export const getAccountError = (state: StateSchema) => state?.account?.error;
