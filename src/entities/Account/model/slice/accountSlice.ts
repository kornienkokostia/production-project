import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { AccountSchema, Account } from '../types/account';
import { fetchAccountData } from '../services/fetchAccountData/fetchAccountData';
import { updateAccountData } from '../services/updateAccountData/updateAccountData';

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
    setReadOnly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload;
    },
    cancelEdit: (state) => {
      state.readonly = true;
      state.form = state.data;
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchAccountData.fulfilled, (state, action: PayloadAction<Account>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(fetchAccountData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateAccountData.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateAccountData.fulfilled, (state, action: PayloadAction<Account>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.form = action.payload;
      })
      .addCase(updateAccountData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: accountActions, reducer: accountReducer } = accountSlice;
