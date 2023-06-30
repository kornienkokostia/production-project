import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppStateSchema } from '../types/appState';

const initialState: AppStateSchema = {
  navbarCollapsed: false,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setNavbarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.navbarCollapsed = action.payload;
    },

  },
});

export const { actions: appStateActions, reducer: appStateReducer } = appStateSlice;
