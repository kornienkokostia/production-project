import { classNames } from 'shared/lib/classNames/classNames';
import { CommentList } from 'entities/Comment';
import { useSelector } from 'react-redux';
import {
  getArticleDetailsData,
  getArticleDetailsIsLoading,
} from 'entities/Article';
import { useTranslation } from 'react-i18next';
import { AddCommentForm } from 'features/addCommentForm';
import { memo, useCallback, useEffect } from 'react';
import { addCommentToArticle } from 'pages/ArticleDetailsPage/model/services/addCommentToArticle/addCommentToArticle';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import cls from './ArticleDetailsComments.module.scss';
import { getArticleComments } from 'pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice';

interface ArticleDetailsCommentsProps {
  className?: string;
  id: string;
}

export const ArticleDetailsComments = memo(
  ({ className, id }: ArticleDetailsCommentsProps) => {
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const comments = useSelector(getArticleComments.selectAll);
    const { t } = useTranslation('article-details');
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchCommentsByArticleId(id));
    }, [dispatch, id]);

    const onSendComment = useCallback(
      (text: string) => {
        dispatch(addCommentToArticle(text));
      },
      [dispatch],
    );

    if (isLoading) {
      return null;
    }

    return (
      <div className={classNames(cls.ArticleDetailsComments, {}, [className])}>
        <h1 className={cls.title}>{t('Comments')}</h1>
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList comments={comments} onSendComment={onSendComment} />
      </div>
    );
  },
);
