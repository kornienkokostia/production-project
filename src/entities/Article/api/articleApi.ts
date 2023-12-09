import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '../model/types/article';

const articleApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    updateArticleViewsCount: build.mutation<Article, { articleId: string, views: number }>({
      query: ({ articleId, views }) => ({
        url: `/articles/${articleId}`,
        method: 'PATCH',
        body: {
          views,
        },
      }),
    }),

  }),
});

export const updateArticleViewsCountMutation = articleApi.endpoints.updateArticleViewsCount.initiate;


