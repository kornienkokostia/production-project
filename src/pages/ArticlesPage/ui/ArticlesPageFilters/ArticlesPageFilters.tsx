import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import SearchIcon from 'shared/assets/icons/search.svg';
import ClearInputIcon from 'shared/assets/icons/clear-input.svg';
import { memo, useCallback, useMemo } from 'react';
import {
  ArticleSortField,
  ArticleType,
  ArticleView,
} from 'entities/Article/model/types/article';
import { useTranslation } from 'react-i18next';
import { SortOrder } from 'shared/types';
import { useSelector } from 'react-redux';
import { getNavbarCollapsed } from 'entities/AppState';
import {
  ArticleCategorySelector,
  ArticleSortSelector,
  ArticleViewSwitcher,
} from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();
  const { className } = props;
  const navbarCollapsed = useSelector(getNavbarCollapsed);
  const view = useSelector(getArticlesPageView);
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSort = useCallback(
    (sort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(sort));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeOrder = useCallback(
    (order: SortOrder) => {
      dispatch(articlesPageActions.setOrder(order));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(articlesPageActions.setSearch(e.target.value));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onClearSearch = useCallback(() => {
    dispatch(articlesPageActions.setSearch(''));
    dispatch(articlesPageActions.setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeCategory = useCallback(
    (type: ArticleType) => {
      dispatch(articlesPageActions.setType(type));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );

  return (
    <>
      <div
        className={classNames(
          cls.articlesPageHeader,
          { [cls.navbarCollapsed]: navbarCollapsed },
          [],
        )}>
        <ArticleViewSwitcher view={view} onViewClick={onChangeView} />
        <div className={cls.search}>
          <SearchIcon className={cls.searchIcon} />
          <input
            type="text"
            placeholder={t('Find in Articles')}
            className={cls.searchInput}
            value={search}
            onChange={onChangeSearch}
          />
          <Button
            theme={ButtonTheme.CLEAR}
            className={cls.clearBtn}
            disabled={!(search.length > 0)}
            onClick={onClearSearch}>
            <ClearInputIcon className={cls.clearBtnIcon} />
          </Button>
        </div>
        {/* <Button theme={ButtonTheme.APPLE_CLEAR} className={cls.createBtn}>
          <span>{t('Create')}</span>
        </Button> */}
      </div>

      <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
        <ArticleCategorySelector
          value={type}
          onChange={onChangeCategory}
          sidebarPadding={!navbarCollapsed}
        />
        <h2 className={cls.title}>{t('Articles')}</h2>
        <ArticleSortSelector
          value={sort}
          order={order}
          onChange={onChangeSort}
          onChangeOrder={onChangeOrder}
        />
      </div>
    </>
  );
});
