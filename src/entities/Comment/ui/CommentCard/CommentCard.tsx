import { classNames } from '@/shared/lib/classNames/classNames';
import { AccountPhoto } from '@/shared/ui/AccountPhoto';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteAccount } from '@/shared/const/router';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  commnet: Comment;
}

export const CommentCard = ({ className, commnet }: CommentCardProps) => (
  <div className={classNames(cls.CommentCard, {}, [className])}>
    <div className={cls.header}>
      <AppLink
        to={getRouteAccount(commnet.user.id)}
        className={cls.headerItemLink}>
        <AccountPhoto src={commnet.user.avatar} className={cls.accountPic} />
      </AppLink>
      <AppLink
        to={getRouteAccount(commnet.user.id)}
        className={cls.headerItemLink}>
        <p>{commnet.user.username}</p>
      </AppLink>
    </div>

    <p className={cls.content}>{commnet.text}</p>
  </div>
);
