import { classNames } from 'shared/lib/classNames/classNames';
import {
  MutableRefObject, memo, useEffect, useRef,
} from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from 'widgets/Page/Page';
import { getArticleDetailsIsLoading } from 'entities/Article/model/selectors/articleDetails';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsPageReducer } from '../../model/slice';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsPageHeader } from '../ArticleDetailsHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';

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

  useEffect(() => {
    wrapperRef.current.scrollTo(0, 0);
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
          <ArticleDetailsComments id={id} />
        </section>
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
