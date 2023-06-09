import { classNames } from 'shared/lib/classNames/classNames';
import { AccountPhoto } from 'shared/ui/AccountPhoto/AccountPhoto';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
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
        to={`${RoutePath.account}${commnet.user.id}`}
        className={cls.headerItemLink}
      >
        <AccountPhoto src={commnet.user.avatar} className={cls.accountPic} />
      </AppLink>
      <AppLink
        to={`${RoutePath.account}${commnet.user.id}`}
        className={cls.headerItemLink}
      >
        <p>{commnet.user.username}</p>
      </AppLink>
    </div>

    <p className={cls.content}>{commnet.text}</p>
  </div>
);
