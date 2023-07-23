import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '@/shared/lib/sidebar/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
}

export const SidebarItem = memo(({ item }: SidebarItemProps) => {
  const { path, Icon, text } = item;
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        classNames(cls.item, { [cls.selected]: isActive }, [])
      }>
      <Icon className={cls.icon} />
      <span className={classNames(cls.link, {}, [])}>{t(text)}</span>
    </NavLink>
  );
});
