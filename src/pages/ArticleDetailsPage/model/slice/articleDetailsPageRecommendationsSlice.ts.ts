import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { articleDetailsPageRecommendationsSchema } from '../types/ArticleDetailsPageRecommendationsSchema';
import { fetchArticlesRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState(),
);

const articleDetailsPageRecommendationsSlice = createSlice({
  name: 'articleDetailsCommentsSlice',
  initialState: recommendationsAdapter.getInitialState<articleDetailsPageRecommendationsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticlesRecommendations.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    }),
    builder.addCase(fetchArticlesRecommendations.fulfilled, (state, action: PayloadAction<Article[]>) => {
      state.isLoading = false;
      recommendationsAdapter.setAll(state, action.payload);
    }),
    builder.addCase(fetchArticlesRecommendations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const {
  reducer: articleDetailsPageRecommendationsReducer,
} = articleDetailsPageRecommendationsSlice;
