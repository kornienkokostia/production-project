import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Account } from '../../types/account';
import { getAccountForm } from '../../selectors/getAccountForm/getAccountForm';

export const updateAccountData = createAsyncThunk<Account, void, ThunkConfig<string>>(
  'account/updateAccountData',
  async (_, { extra, rejectWithValue, getState }) => {
    const formData = getAccountForm(getState())

    try {
      const response = await extra.api.put<Account>('/account', formData);

      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
