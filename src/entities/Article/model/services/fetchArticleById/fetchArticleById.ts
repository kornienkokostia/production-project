import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '../../types/article';
import { updateArticleViewsCountMutation } from '@/entities/Article/api/articleApi';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
  'articleDetails/fetchArticleById',
  async (articleId, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.get<Article>(`/articles/${articleId}`, {
        params: {
          _expand: 'user',
        },
      });

      dispatch(updateArticleViewsCountMutation({
        articleId: articleId,
        views: ++response.data.views
      }))

      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
