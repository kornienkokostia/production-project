import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkExtraArg } from 'app/providers/StoreProvider';
import { Account } from '../../types/account';

export const fetchAccountData = createAsyncThunk<Account, void, ThunkConfig<string>>(
  'account/fetchAccountData',
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Account>('/account');

      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
