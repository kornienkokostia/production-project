import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Account } from 'entities/Account';
import { getAccountForm } from '../../selectors/getAccountForm/getAccountForm';

export const updateAccountData = createAsyncThunk<Account, string, ThunkConfig<string>>(
  'account/updateAccountData',
  async (userId, { extra, rejectWithValue, getState }) => {
    const formData = getAccountForm(getState());

    try {
      const response = await extra.api.put<Account>(`/account/${userId}`, formData);

      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
