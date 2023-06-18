import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import SingInIcon from 'shared/assets/icons/singin-btn.svg';
import { LoginModal } from 'features/AuthByUserName';
import SettingsIcon from 'shared/assets/icons/settings.svg';
import { Submenu } from 'shared/ui/Submenu/Submenu';
import { Settings } from 'widgets/Settings/ui/Settings';
import cls from './Navbar.module.scss';
import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthOpen(false);
  }, []);
  const onShowModal = useCallback(() => {
    setIsAuthOpen(true);
  }, []);

  const onToggleSettings = useCallback(() => {
    setSettingsOpen(prev => !prev);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.NavbarRight}>
        {authData ? (
          <Button theme={ButtonTheme.CLEAR} className={cls.NavbarItem}>
            {authData.username[0].toLocaleUpperCase()}
          </Button>
        ) : (
          <Button
            theme={ButtonTheme.APPLE}
            className={cls.NavbarSignin}
            onClick={onShowModal}
          >
            <SingInIcon className={cls.SingInIcon} />
            <span>{t('Sign in')}</span>
          </Button>
        )}
        <Button
          theme={ButtonTheme.CLEAR}
          className={cls.NavbarItem}
          onClick={onToggleSettings}
        >
          <SettingsIcon className={cls.ItemIcon} />
        </Button>
      </div>
      {!authData && <LoginModal isOpen={isAuthOpen} onClose={onCloseModal} />}
      <Submenu isOpen={isSettingsOpen} onClose={onToggleSettings}>
        <Settings />
      </Submenu>
    </div>
  );
};
