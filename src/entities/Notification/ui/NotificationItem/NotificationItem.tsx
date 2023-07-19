import { useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notifications';

interface NotificationItemProps {
  className?: string;
  item: Notification;
  hasDivider: boolean;
  onClosePopup: () => void;
}

export const NotificationItem = ({
  className,
  item,
  hasDivider,
  onClosePopup,
}: NotificationItemProps) => {
  const onItemClick = useCallback(() => {
    // navigate(RoutePath.admin_panel);
    onClosePopup();
  }, [onClosePopup]);

  const content = (
    <>
      <div className={classNames(cls.NotificationItem, {}, [className])}>
        <p className={cls.title}>{item.title}</p>
        <p className={cls.description}>{item.description}</p>
      </div>
    </>
  );
  if (item.href) {
    return (
      <>
        <AppLink to={item.href} className={cls.NotifBtn} onClick={onItemClick}>
          {content}
        </AppLink>
        {hasDivider && <div className={cls.divider} />}
      </>
    );
  }

  return (
    <>
      {content}
      {hasDivider && <div className={cls.divider} />}
    </>
  );
};
