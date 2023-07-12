import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import {
  ArticleList,
  ArticleView,
  getArticleDetailsIsLoading,
} from 'entities/Article';
import { useSelector } from 'react-redux';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import cls from './ArticleRecommendationsList.module.scss';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  (props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data: articles, isLoading } = useArticleRecommendationsList(6);
    const isArticleLoading = useSelector(getArticleDetailsIsLoading);

    if (isArticleLoading || !articles) {
      return null;
    }

    return (
      <div className={cls.ArticleRecommendationsList}>
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
