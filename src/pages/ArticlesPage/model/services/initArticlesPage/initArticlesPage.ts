import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import {
  getArticlesPageInited,
} from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

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
      const orderFromUrl = searchParams.get('order') as SortOrder;
      const sortFromUrl = searchParams.get('sort') as ArticleSortField;
      const seearchFromUrl = searchParams.get('search');
      const typeFromUrl = searchParams.get('type') as ArticleType;

      if (orderFromUrl) {
        dispatch(articlesPageActions.setOrder(
          orderFromUrl === 'asc' || orderFromUrl === 'desc' ? orderFromUrl : 'asc',
        ));
      }
      if (sortFromUrl) {
        dispatch(articlesPageActions.setSort(
          Object.values(ArticleSortField).includes(sortFromUrl) ? sortFromUrl : ArticleSortField.CREATED,
        ));
      }
      if (seearchFromUrl) {
        dispatch(articlesPageActions.setSearch(seearchFromUrl));
      }
      if (typeFromUrl) {
        dispatch(articlesPageActions.setType(
          Object.values(ArticleType).includes(typeFromUrl) ? typeFromUrl : ArticleType.ALL,
        ));
      }

      dispatch(articlesPageActions.initState());
      dispatch(
        fetchArticlesList({}),
      );
    }
  },
);
