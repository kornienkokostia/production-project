import { StateSchema } from '@/app/providers/StoreProvider';

export const getAccountFormErrors = (state: StateSchema) => state?.account?.formErrors;
