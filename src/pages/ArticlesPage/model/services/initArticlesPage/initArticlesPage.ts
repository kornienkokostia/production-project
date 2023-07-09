import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getArticlesPageInited,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>(
  'articlesPage/fetchNextArticlesPage',
  async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getArticlesPageInited(getState());

    if (!inited) {
      const orderFromUrl = searchParams.get('order') as SortOrder
      const sortFromUrl = searchParams.get('sort') as ArticleSortField
      const seearchFromUrl = searchParams.get('search')

      if (orderFromUrl) {
        dispatch(articlesPageActions.setOrder(orderFromUrl))
      }
      if (sortFromUrl) {
        dispatch(articlesPageActions.setSort(sortFromUrl))
      }
      if (seearchFromUrl) {
        dispatch(articlesPageActions.setSearch(seearchFromUrl))
      }

      dispatch(articlesPageActions.initState());
      dispatch(
        fetchArticlesList({ replace: false }),
      );
    }
  },
);
