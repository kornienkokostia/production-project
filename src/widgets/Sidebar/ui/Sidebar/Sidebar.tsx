import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import HomeIcon from 'shared/assets/icons/home.svg';
import { useTranslation } from 'react-i18next';
import cls from './Sidebar.module.scss';
import ToggleIcon from 'shared/assets/icons/nav-bar-toggle-btn.svg';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentSelected, setCurrentSelected] = useState<AppRoutes>(
    AppRoutes.MAIN,
  );
  const { t } = useTranslation();

  const onToggle = () => setCollapsed(prev => !prev);

  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        onClick={onToggle}
        theme={ButtonTheme.CLEAR}
        className={cls.collapseBtn}
      >
        <ToggleIcon className={cls.icon} />
      </Button>
      <div className={cls.items}>
        <AppLink
          to={RoutePath.main}
          className={classNames(cls.item, {}, [
            currentSelected === AppRoutes.MAIN ? cls.selected : undefined,
          ])}
          onClick={() => setCurrentSelected(AppRoutes.MAIN)}
        >
          <HomeIcon className={cls.icon} />
          <span className={cls.link}>{t('Main page')}</span>
        </AppLink>

        <AppLink
          to={RoutePath.about}
          className={classNames(cls.item, {}, [
            currentSelected === AppRoutes.ABOUT ? cls.selected : undefined,
          ])}
          onClick={() => setCurrentSelected(AppRoutes.ABOUT)}
        >
          <AboutIcon className={cls.icon} />
          <span className={cls.link}>{t('About page')}</span>
        </AppLink>
      </div>
    </div>
  );
};
