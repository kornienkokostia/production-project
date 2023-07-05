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
  articlePageActions,
  articlePageReducer,
  getArticles,
} from '../../model/slice/articlePageSlice';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { useSelector } from 'react-redux';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getNavbarCollapsed } from 'entities/AppState';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlePageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const errors = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);
  const navbarCollapsed = useSelector(getNavbarCollapsed);

  useEffect(() => {
    dispatch(fetchArticlesList());
    dispatch(articlePageActions.initState());
  }, [dispatch]);

  const onChnageView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageActions.setView(view));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
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
        <div className={cls.ArticlesPage}>
          <ArticleList view={view} isLoading={isLoading} articles={articles} />
        </div>
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
