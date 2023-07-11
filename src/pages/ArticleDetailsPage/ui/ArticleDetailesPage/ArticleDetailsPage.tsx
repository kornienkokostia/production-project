import { classNames } from 'shared/lib/classNames/classNames';
import {
  MutableRefObject, memo, useCallback, useEffect, useRef,
} from 'react';
import { ArticleDetails, ArticleList, ArticleView } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CommentList } from 'entities/Comment';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from 'widgets/Page/Page';
import { getArticleDetailsIsLoading } from 'entities/Article/model/selectors/articleDetails';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentToArticle } from '../../model/services/addCommentToArticle/addCommentToArticle';
import { articleDetailsPageReducer } from '../../model/slice';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleRecommendations } from '../../model/slice/articleDetailsPageRecommendationsSlice.ts';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { ArticleDetailsPageHeader } from '../ArticleDetailsHeader/ArticleDetailsPageHeader';
import { fetchArticlesRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';

interface ArticleDetailesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailesPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsLoading = useSelector(
    getArticleRecommendationsIsLoading,
  );
  const dispatch = useAppDispatch();
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isLoading = useSelector(getArticleDetailsIsLoading);

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentToArticle(text));
    },
    [dispatch],
  );

  useEffect(() => {
    wrapperRef.current.scrollTo(0, 0);
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticlesRecommendations());
  }, [dispatch, id]);

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailesPage, {}, [className])}>
        {t('Article is not found')}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
        <ArticleDetailsPageHeader />
        <section className={cls.ArticleDetailesWrapper} ref={wrapperRef}>
          <ArticleDetails id={id} />
          {!isLoading && (
            <>
              <div className={cls.ArticleRecommendations}>
                <h1 className={cls.title}>{t('Recommendations')}</h1>
                <ArticleList
                  articles={recommendations}
                  isLoading={recommendationsLoading}
                  view={ArticleView.SMALL}
                  className={cls.recommendations}
                />
              </div>
              <CommentList comments={comments} onSendComment={onSendComment} />
            </>
          )}
        </section>
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
