import { classNames } from 'shared/lib/classNames/classNames';
import { CommentList } from 'entities/Comment';
import { useSelector } from 'react-redux';
import { getArticleDetailsIsLoading } from 'entities/Article';
import { useTranslation } from 'react-i18next';
import { AddCommentForm } from 'features/addCommentForm';
import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addCommentToArticle } from '../../model/services/addCommentToArticle/addCommentToArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import cls from './ArticleDetailsComments.module.scss';

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
