import { StateSchema } from '@/app/providers/StoreProvider';

export const getUsernameFocused = (state: StateSchema) => state?.loginForm?.usernameFocused || false;
