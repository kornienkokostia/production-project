import { MutableRefObject, memo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { articleDetailsPageReducer } from '../../model/slice';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/articleRating';

interface ArticleDetailesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailesPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const timeoutRef = useRef() as MutableRefObject<
    ReturnType<typeof setTimeout>
  >;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      wrapperRef.current.scrollTo(0, 0);
    }, 0);
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [id]);

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
        {t('Article is not found')}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
        <ArticleDetailsPageHeader />
        <section className={cls.ArticleDetailesWrapper} ref={wrapperRef}>
          <ArticleDetails id={id} />
          <ArticleRecommendationsList />
          <ArticleRating articleId={id} />
          <ArticleDetailsComments id={id} />
        </section>
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
