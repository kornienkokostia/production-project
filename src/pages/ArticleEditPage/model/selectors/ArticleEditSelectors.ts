import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleType } from '@/entities/Article';
import { ArticleBlock, NewArticle } from '@/entities/Article/model/types/article';
import { getUserAuthData } from '@/entities/User';
import { getDateToday } from '@/shared/lib/helpers/helpers';
import { createSelector } from '@reduxjs/toolkit';

export const getEditTitle = (state: StateSchema) => String(state?.articleEditPage?.title || '')
export const getEditSubtitle = (state: StateSchema) => String(state?.articleEditPage?.subtitle || '')
export const getEditImg = (state: StateSchema) => String(state?.articleEditPage?.img || '')
export const getEditType = (state: StateSchema) => state?.articleEditPage?.type || [ArticleType.MOBILE_DEV] as ArticleType[]
export const getEditBlocks = (state: StateSchema) => state?.articleEditPage?.blocks || [] as ArticleBlock[]

export const getEditArticleData = createSelector(
  getEditTitle,
  getEditSubtitle,
  getEditImg,
  getEditType,
  getEditBlocks,
  getUserAuthData,
  (title, subtitle, img, type, blocks, user) => {
    return {
      title,
      userId: user!.id,
      subtitle,
      img,
      views: 0,
      createdAt: getDateToday(),
      type,
      blocks,
    };
  },
);