import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

export const saveJsonSettings = createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig<string>>(
  'user/saveJsonSettings',
  async (newJsonSettings, { rejectWithValue, getState, dispatch }) => {
    const userData = getUserAuthData(getState())
    const currentSettings = getJsonSettings(getState())

    if (!userData) {
      return rejectWithValue('error');
    }
    try {
      const response = await dispatch(setJsonSettingsMutation({
        userId: userData.id,
        jsonSettings: {
          ...currentSettings,
          ...newJsonSettings
        }
      })).unwrap()

      if (!response.jsonSettings) {
        return rejectWithValue('error');
      }
      return response.jsonSettings

    } catch (error) {
      return rejectWithValue('error');
    }
  },
);