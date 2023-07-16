import { StateSchema } from '@/app/providers/StoreProvider';

export const getAccountReadonly = (state: StateSchema) => state?.account?.readonly;
