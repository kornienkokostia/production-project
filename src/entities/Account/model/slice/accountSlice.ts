import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { AccountSchema, Account } from '../types/account';
import { fetchAccountData } from '../services/fetchAccountData/fetchAccountData';

const initialState: AccountSchema = {
  readonly: true,
  isLoading: false,
  data: undefined,
  error: undefined,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.data!.firstname = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccountData.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    }),
    builder.addCase(fetchAccountData.fulfilled, (state, action: PayloadAction<Account>) => {
      state.isLoading = false;
      state.data = action.payload;
    }),
    builder.addCase(fetchAccountData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: accountActions, reducer: accountReducer } = accountSlice;
