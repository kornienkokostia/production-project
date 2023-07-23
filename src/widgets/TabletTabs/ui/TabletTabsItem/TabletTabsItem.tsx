import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TabletTabsItem.module.scss';
import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebar';
import { getUserAuthData } from '@/entities/User';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface TabletTabsItemProps {
  item: SidebarItemType;
  hasDivider?: boolean;
}

export const TabletTabsItem = ({ item, hasDivider }: TabletTabsItemProps) => {
  const isAuth = useSelector(getUserAuthData);
  const { path, Icon, text } = item;
  const { t } = useTranslation();

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <>
      <NavLink
        to={path}
        className={({ isActive }) =>
          classNames(cls.item, { [cls.selected]: isActive }, [])
        }>
        <Icon className={cls.icon} />
        <span className={classNames(cls.link, {}, [])}>{t(text)}</span>
      </NavLink>
      {hasDivider && <div className={cls.divider}></div>}
    </>
  );
};
