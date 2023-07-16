import { StateSchema } from '@/app/providers/StoreProvider';

export const getPasswordFocused = (state: StateSchema) => state?.loginForm?.passwordFocused || false;
