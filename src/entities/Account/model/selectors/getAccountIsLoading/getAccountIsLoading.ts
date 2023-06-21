import { StateSchema } from 'app/providers/StoreProvider';

export const getAccountIsLoading = (state: StateSchema) => state?.account?.isLoading;
