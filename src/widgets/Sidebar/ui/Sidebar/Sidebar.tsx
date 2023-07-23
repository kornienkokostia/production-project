import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import ToggleIcon from '@/shared/assets/icons/nav-bar-toggle-btn.svg';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { appStateActions, getNavbarCollapsed } from '@/entities/AppState';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { getSidebarItems } from '@/shared/lib/sidebar/selector/getSidebarItems';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const navbarCollapsed = useSelector(getNavbarCollapsed);
  const sidebarItemsList = useSelector(getSidebarItems);

  const onNavbarCollapsedClick = useCallback(() => {
    dispatch(appStateActions.setNavbarCollapsed(!navbarCollapsed));
  }, [dispatch, navbarCollapsed]);

  return (
    <nav className={classNames(cls.Sidebar, {}, [className])}>
      <Button
        onClick={onNavbarCollapsedClick}
        theme="clear"
        className={cls.collapseBtn}>
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
          <SidebarItem key={el.route} item={el} />
        ))}
      </div>
    </nav>
  );
});
