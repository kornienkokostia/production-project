import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

export const fetchArticlesRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
  'articlesPage/fetchArticlesRecommendations',
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _limit: 6,
        },
      });
      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
