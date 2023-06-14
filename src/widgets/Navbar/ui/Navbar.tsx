import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import SingInIcon from 'shared/assets/icons/singin-btn.svg';
import cls from './Navbar.module.scss';
import { LoginModal } from 'features/AuthByUserName';
import SettingsIcon from 'shared/assets/icons/settings.svg';
import { Submenu } from 'shared/ui/Submenu/Submenu';
import { Settings } from 'widgets/Settings/ui/Settings';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthOpen(prev => !prev);
  }, []);

  const onToggleSettings = useCallback(() => {
    setSettingsOpen(prev => !prev);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.NavbarRight}>
        <Button
          theme={ButtonTheme.APPLE}
          className={cls.NavbarSignin}
          onClick={onToggleModal}
        >
          <SingInIcon className={cls.SingInIcon} />
          <span>{t('Sign in')}</span>
        </Button>
        <Button
          theme={ButtonTheme.CLEAR}
          className={classNames(
            cls.NavbarItem,
            { [cls.settingsOpened]: isSettingsOpen },
            [],
          )}
          onClick={onToggleSettings}
        >
          <SettingsIcon className={cls.ItemIcon} />
        </Button>
      </div>
      <LoginModal isOpen={isAuthOpen} onClose={onToggleModal} />
      <Submenu isOpen={isSettingsOpen} onClose={onToggleSettings}>
        <Settings />
      </Submenu>
    </div>
  );
};
