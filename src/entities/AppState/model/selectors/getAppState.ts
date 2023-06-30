import { StateSchema } from 'app/providers/StoreProvider';

export const getNavbarCollapsed = (state: StateSchema) => state.appState.navbarCollapsed;
