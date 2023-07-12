import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { AddCommentForm } from 'features/addCommentForm';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';
import cls from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  onSendComment: (text: string) => void;
}

export const CommentList = ({ className, comments }: CommentListProps) => {
  const { t } = useTranslation('article-details');

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length ? (
        comments.map(el => <CommentCard commnet={el} key={el.id} />)
      ) : (
        <p>{t('No comments')}</p>
      )}
    </div>
  );
};
