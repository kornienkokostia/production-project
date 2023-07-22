import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  MutableRefObject, useEffect, useRef, useState,
} from 'react';
import { ArticleList } from '@/entities/Article';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../../model/slice/articlesPageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { appStateActions } from '@/entities/AppState';

interface ArticlesInfiniteListProps {
  className?: string;
}

export const ArticlesInfiniteList = ({
  className,
}: ArticlesInfiniteListProps) => {
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);
  const { t } = useTranslation('articles');
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isLoading) {
      timeRef.current = setTimeout(() => {
        dispatch(appStateActions.setContentLoaded(true));
      }, 100);
    }
    return () => clearTimeout(timeRef.current);
  }, [isLoading, dispatch]);

  if (error) {
    return <div>{t('Error while loading articles')}</div>;
  }

  return (
    <ArticleList
      view={view}
      isLoading={isLoading}
      articles={articles}
      className={className}
    />
  );
};
