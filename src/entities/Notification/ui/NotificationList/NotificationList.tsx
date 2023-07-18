import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
  className?: string;
  isMobile?: boolean;
  onClosePopup: () => void;
}

export const NotificationList = ({
  className,
  isMobile,
  onClosePopup,
}: NotificationListProps) => {
  const { t } = useTranslation();
  const { data } = useNotifications(null, {
    // pollingInterval: 5000,
  });

  return (
    <div
      className={classNames(
        cls.NotificationListWrapper,
        { [cls.mobile]: isMobile },
        [className],
      )}
    >
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
              onClosePopup={onClosePopup}
            />
          ))}
      </div>
    </div>
  );
};
