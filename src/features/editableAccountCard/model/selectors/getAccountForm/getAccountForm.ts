import { StateSchema } from '@/app/providers/StoreProvider';

export const getAccountForm = (state: StateSchema) => state?.account?.form;
