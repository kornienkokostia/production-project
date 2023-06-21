import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from 'widgets/Sidebar/model/items';
import { AppRoutes } from 'shared/config/routeConfig/routeConfig';
import { Dispatch, SetStateAction, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface SidebarItemProps {
  item: SidebarItemType;
  currentSelected: AppRoutes;
  setCurrentSelected: Dispatch<SetStateAction<AppRoutes>>;
  collapsed: boolean;
}

export const SidebarItem = memo(
  ({
    item,
    currentSelected,
    setCurrentSelected,
    collapsed,
  }: SidebarItemProps) => {
    const { route, path, Icon, text } = item;
    const { t } = useTranslation();

    return (
      <AppLink
        to={path}
        className={classNames(cls.item, {}, [
          currentSelected === route ? cls.selected : undefined,
        ])}
        onClick={() => setCurrentSelected(route)}
      >
        <Icon className={cls.icon} />
        <span
          className={classNames(cls.link, { [cls.collapsed]: collapsed }, [])}
        >
          {t(text)}
        </span>
      </AppLink>
    );
  },
);
