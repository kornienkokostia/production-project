import { Dispatch, SetStateAction, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  currentSelected: AppRoutes;
  setCurrentSelected: Dispatch<SetStateAction<AppRoutes>>;
}

export const SidebarItem = memo(
  ({ item, currentSelected, setCurrentSelected }: SidebarItemProps) => {
    const {
      route, path, Icon, text,
    } = item;
    const { t } = useTranslation();
    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) {
      return null;
    }

    return (
      <AppLink
        to={path}
        className={classNames(cls.item, {}, [
          currentSelected === route ? cls.selected : undefined,
        ])}
        onClick={() => setCurrentSelected(route)}
      >
        <Icon className={cls.icon} />
        <span className={classNames(cls.link, {}, [])}>{t(text)}</span>
      </AppLink>
    );
  },
);
