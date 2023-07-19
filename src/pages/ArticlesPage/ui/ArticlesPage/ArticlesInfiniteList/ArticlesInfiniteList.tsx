import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ArticleList } from '@/entities/Article';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../../model/selectors/articlesPageSelectors';
import {
  getArticles,
} from '../../../model/slice/articlesPageSlice';

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
