import { classNames } from 'shared/lib/classNames/classNames';
import { useNotifications } from 'entities/Notification/api/notificationApi';
import { useTranslation } from 'react-i18next';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = ({ className }: NotificationListProps) => {
  const { t } = useTranslation();
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 5000,
  });

  return (
    <div className={classNames(cls.NotificationListWrapper, {}, [className])}>
      <div className={cls.NotificationListHeader}>
        <h2>{t('Notifications')}</h2>
      </div>
      <div className={cls.NotificationList}>
        {data &&
          data.map((item, i) => (
            <NotificationItem
              key={item.id}
              item={item}
              hasDivider={i < data.length - 1}
            />
          ))}
      </div>
    </div>
  );
};
