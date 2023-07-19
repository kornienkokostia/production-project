import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { RoutePath, AppRoutes } from '@/shared/const/router';
import ToggleIcon from '@/shared/assets/icons/nav-bar-toggle-btn.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { appStateActions, getNavbarCollapsed } from '@/entities/AppState';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { getSidebarItems } from '../../model/selector/getSidebarItems';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navbarCollapsed = useSelector(getNavbarCollapsed);
  const sidebarItemsList = useSelector(getSidebarItems);

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

  const onNavbarCollapsedClick = useCallback(() => {
    dispatch(appStateActions.setNavbarCollapsed(!navbarCollapsed));
  }, [dispatch, navbarCollapsed]);

  return (
    <nav className={classNames(cls.Sidebar, {}, [className])}>
      <Button
        onClick={onNavbarCollapsedClick}
        theme={ButtonTheme.CLEAR}
        className={cls.collapseBtn}
      >
        <ToggleIcon className={cls.icon} />
      </Button>
      <div
        className={classNames(
          cls.divider,
          { [cls.collapsed]: navbarCollapsed },
          [],
        )}
      />
      <div className={cls.items}>
        {sidebarItemsList.map(el => (
          <SidebarItem
            key={el.route}
            item={el}
            currentSelected={currentSelected}
            setCurrentSelected={setCurrentSelected}
          />
        ))}
      </div>
    </nav>
  );
});
