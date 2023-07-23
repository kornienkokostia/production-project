import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery, setUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

export const updateAuthData = createAsyncThunk<User, string, ThunkConfig<string>>(
  'user/updateAuthData',
  async (avatar, { rejectWithValue, dispatch }) => {
    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) {
      return rejectWithValue('error');
    }
    try {
      const response = await dispatch(setUserDataByIdQuery({
        userId, avatar,
      })).unwrap();

      return response;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
