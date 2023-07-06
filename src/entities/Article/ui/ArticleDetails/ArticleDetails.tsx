import { classNames } from 'shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Loader } from 'shared/ui/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { getNavbarCollapsed } from 'entities/AppState';
import { Comment, CommentList } from 'entities/Comment';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import ArrowBackIcon from 'shared/assets/icons/arrow-back.svg';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleDetailsProps {
  className?: string;
  id: string;
  comments?: Comment[];
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(
  ({ className, id, comments, onSendComment }: ArticleDetailsProps) => {
    const { t } = useTranslation('article-details');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);
    const navbarCollapsed = useSelector(getNavbarCollapsed);
    const navigate = useNavigate();

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

    const onBackToList = useCallback(() => {
      navigate(RoutePath.articles);
    }, [navigate]);

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
        <div
          className={classNames(
            cls.ArticleHeader,
            { [cls.navbarCollapsed]: navbarCollapsed },
            [],
          )}
        >
          <Button
            theme={ButtonTheme.APPLE_CLEAR}
            className={cls.backBtn}
            onClick={onBackToList}
          >
            <ArrowBackIcon className={cls.btnIcon} />
            <span>{t('Articles')}</span>
          </Button>
          {article && (
            <>
              <p className={cls.date}>{article?.createdAt}</p>

              <p className={cls.views}>{`${article?.views} ${t('views')}`}</p>
            </>
          )}
        </div>
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
          {content}
          {article && (
            <CommentList comments={comments} onSendComment={onSendComment} />
          )}
        </div>
      </DynamicModuleLoader>
    );
  },
);