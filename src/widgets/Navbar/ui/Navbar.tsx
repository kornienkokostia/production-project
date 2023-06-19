import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import SingInIcon from 'shared/assets/icons/singin-btn.svg';
import { LoginModal } from 'features/AuthByUserName';
import SettingsIcon from 'shared/assets/icons/settings.svg';
import { Submenu, SubmenuTheme } from 'shared/ui/Submenu/Submenu';
import cls from './Navbar.module.scss';
import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import AccountPlaceholderIcon from 'shared/assets/icons/account-pic-placeholder.svg';
import { Settings } from 'widgets/Settings';
import { AccountPopup } from 'widgets/AccountPopup';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false);
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
  const onToggleAccountPopup = useCallback(() => {
    setAccountPopupOpen(prev => !prev);
  }, []);
  const onCloseAccountPopup = useCallback(() => {
    setAccountPopupOpen(false);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.NavbarRight}>
        {authData ? (
          <Button
            theme={ButtonTheme.CLEAR}
            className={cls.NavbarItem}
            onClick={onToggleAccountPopup}
          >
            <div className={cls.AccountBtn}>
              <AccountPlaceholderIcon className={cls.ItemIcon} />
            </div>
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
      {authData && (
        <Submenu
          isOpen={isAccountPopupOpen}
          onClose={onToggleAccountPopup}
          theme={SubmenuTheme.ACCOUNT}
        >
          <AccountPopup
            username={authData.username}
            onSignOutClosePopup={onCloseAccountPopup}
          />
        </Submenu>
      )}
    </div>
  );
};
