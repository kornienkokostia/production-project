import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Account } from '@/entities/Account';

export const fetchAccountData = createAsyncThunk<Account, string, ThunkConfig<string>>(
  'account/fetchAccountData',
  async (userId, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Account>(`/users/${userId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
