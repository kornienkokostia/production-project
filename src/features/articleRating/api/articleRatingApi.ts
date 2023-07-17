import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getArticleRating: build.query<Rating[], { userId: string, articleId: string }>({
      query: ({ userId, articleId }) => ({
        url: '/article-ratings',
        params: {
          userId,
          articleId,
        },
      }),
    }),
  }),
});

export const useArticleRating =
  articleRatingApi.useGetArticleRatingQuery;
