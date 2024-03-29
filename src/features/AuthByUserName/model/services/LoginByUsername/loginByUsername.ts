import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

interface loginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<User, loginByUsernameProps, ThunkConfig<string>>(
  'users/loginByUsername',
  async (authData, { dispatch, extra, rejectWithValue }) => {
    try {
      const response = await extra.api.post<User>('/login', authData);
      if (!response.data) {
        throw new Error();
      }

      dispatch(userActions.setAuthData(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
