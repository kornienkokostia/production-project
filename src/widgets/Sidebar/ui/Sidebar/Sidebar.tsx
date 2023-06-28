import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useEffect, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';
import ToggleIcon from 'shared/assets/icons/nav-bar-toggle-btn.svg';
import { useLocation } from 'react-router-dom';
import { SidebarItemsList } from 'widgets/Sidebar/model/items';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
  className?: string;
  onToggle: () => void;
}

export const Sidebar = memo(({ className, onToggle }: SidebarProps) => {
  const location = useLocation();

  const [currentSelected, setCurrentSelected] = useState<AppRoutes>(
    Object.keys(RoutePath).find(
      key => RoutePath[key as keyof typeof RoutePath] === location.pathname,
    ) as keyof typeof RoutePath,
  );

  useEffect(() => {
    setCurrentSelected(
      Object.keys(RoutePath).find(
        key => RoutePath[key as keyof typeof RoutePath] === location.pathname,
      ) as keyof typeof RoutePath,
    );
  }, [location]);

  return (
    <div className={classNames(cls.Sidebar, {}, [className])}>
      <Button
        onClick={onToggle}
        theme={ButtonTheme.CLEAR}
        className={cls.collapseBtn}
      >
        <ToggleIcon className={cls.icon} />
      </Button>
      <div className={cls.items}>
        {SidebarItemsList.map(el => (
          <SidebarItem
            key={el.route}
            item={el}
            currentSelected={currentSelected}
            setCurrentSelected={setCurrentSelected}
          />
        ))}
      </div>
    </div>
  );
});
