import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { NewArticle } from '@/entities/Article/model/types/article';
import { getEditArticleData } from '../selectors/ArticleEditSelectors';
import { articlesPageActions } from '@/pages/ArticlesPage/model/slice/articlesPageSlice';
import { fetchArticlesList } from '@/pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { articleEditActions } from '../slice/articleEditSlice';

export const addNewArticle = createAsyncThunk<NewArticle, void, ThunkConfig<string>>(
  'articleEdit/addNewArticle',
  async (_, {
    extra, dispatch, getState, rejectWithValue
  }) => {
    const newArticle = getEditArticleData(getState());

    try {
      const response = await extra.api.post<NewArticle>('/articles', newArticle);
      if (!response.data) {
        throw new Error();
      }

      dispatch(articlesPageActions.setSearch(''));
      dispatch(articlesPageActions.setPage(1));
      dispatch(fetchArticlesList({ replace: true }))
      dispatch(articleEditActions.resetFileds())
      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  },
);
