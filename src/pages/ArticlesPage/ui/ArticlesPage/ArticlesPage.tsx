import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import {
  Article,
  ArticleList,
  ArticleView,
  ArticleViewSwitcher,
} from 'entities/Article';
import cls from './ArticlesPage.module.scss';
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from '../../model/slice/articlesPageSlice';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useSelector } from 'react-redux';
import {
  getArticlesPageError,
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getNavbarCollapsed } from 'entities/AppState';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const errors = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);
  const navbarCollapsed = useSelector(getNavbarCollapsed);

  const onLoadNextPart = useCallback(() => {
    console.log('e');
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(articlesPageActions.initState());
    dispatch(
      fetchArticlesList({
        page: 1,
      }),
    );
  }, [dispatch]);

  const onChnageView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticlesPageWrapper, {}, [className])}>
        <div
          className={classNames(
            cls.ArticlePageHeader,
            { [cls.navbarCollapsed]: navbarCollapsed },
            [],
          )}
        >
          <ArticleViewSwitcher view={view} onViewClick={onChnageView} />
        </div>
        <Page className={cls.ArticlesPage} onScrollEnd={onLoadNextPart}>
          <ArticleList view={view} isLoading={isLoading} articles={articles} />
        </Page>
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);