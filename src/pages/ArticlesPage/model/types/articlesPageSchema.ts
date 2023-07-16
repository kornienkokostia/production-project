import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from '@/entities/Article';
import { ArticleType, ArticleSortField } from '@/entities/Article/model/consts/articleConsts';
import { SortOrder } from '@/shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean
  error?: string

  // pagination
  page: number
  limit: number
  hasMore: boolean

  // filters
  view: ArticleView
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType

  _inited: boolean
}
