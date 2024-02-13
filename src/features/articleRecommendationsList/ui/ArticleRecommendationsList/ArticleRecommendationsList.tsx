import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  ArticleList,
  ArticleView,
  getArticleDetailsIsLoading,
} from '@/entities/Article';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import cls from './ArticleRecommendationsList.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { data: articles, isLoading } = useArticleRecommendationsList(6);
    const isArticleLoading = useSelector(getArticleDetailsIsLoading);

    if (isArticleLoading || !articles) {
      return null;
    }

    return (
      <div
        className={classNames(cls.ArticleRecommendationsList, {}, [className])}>
        <h1 className={cls.title}>{t('Recommendations')}</h1>
        <ArticleList
          articles={articles}
          isLoading={isLoading}
          view={ArticleView.SMALL}
          className={cls.recommendations}
        />
      </div>
    );
  },
);
