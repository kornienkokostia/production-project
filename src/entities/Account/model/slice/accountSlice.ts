import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { AccountSchema, Account } from '../types/account';

const initialState: AccountSchema = {
  readonly: true,
  isLoading: false,
  data: undefined,
  error: undefined
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {

  },
});

export const { actions: accountActions, reducer: accountReducer } = accountSlice;