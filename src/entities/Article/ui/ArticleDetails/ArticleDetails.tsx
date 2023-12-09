import { MutableRefObject, memo, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from '@/shared/ui/Loader';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { appStateActions } from '@/entities/AppState';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
  const { t } = useTranslation('article-details');
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (!isLoading) {
      timeRef.current = setTimeout(() => {
        dispatch(appStateActions.setContentLoaded(true));
      }, 100);
    }
    return () => clearTimeout(timeRef.current);
  }, [isLoading, dispatch]);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent key={block.id} block={block} />;
      case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent key={block.id} block={block} />;
      case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent key={block.id} block={block} />;
      default:
        return null;
    }
  }, []);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content: JSX.Element;

  if (isLoading || isLoading === undefined) {
    content = (
      <div className={classNames(cls.loading, {}, [])}>
        <Loader />
      </div>
    );
  } else if (error) {
    content = (
      <div className={classNames(cls.error, {}, [])}>
        <h2>{t('Article is not found')}</h2>
      </div>
    );
  } else {
    content = (
      <div className={cls.Article}>
        <div className={cls.ArticleName}>
          <h1 className={cls.title}>{article?.title}</h1>
          <p className={cls.subtitle}>{article?.subtitle}</p>
        </div>
        <img className={cls.img} src={article?.img} alt="article" />
        {article?.blocks.map(el => renderBlock(el))}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
});
