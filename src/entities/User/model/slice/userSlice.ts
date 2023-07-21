import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_THEME_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { initAuthData } from '../services/initAuthData';
import { Theme } from '@/shared/const/theme';

const initialState: UserSchema = {
  _inited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features)
      localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id)
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, action.payload.jsonSettings?.theme || Theme.LIGHT)
    },
    signOut: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveJsonSettings.fulfilled, (state, { payload }: PayloadAction<JsonSettings>) => {
      if (state.authData) {
        state.authData.jsonSettings = payload
      }
    })
    builder.addCase(initAuthData.fulfilled, (state, { payload }: PayloadAction<User>) => {
      state.authData = payload
      setFeatureFlags(payload.features)
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, payload.jsonSettings?.theme || Theme.LIGHT)
      state._inited = true;
    })
    builder.addCase(initAuthData.rejected, (state) => {
      state._inited = true
    })
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
