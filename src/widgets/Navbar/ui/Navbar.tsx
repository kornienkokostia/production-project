import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import SingInIcon from '@/shared/assets/icons/singin-btn.svg';
import { LoginModal } from '@/features/AuthByUserName';
import { getUserAuthData, getUserInited } from '@/entities/User';
import cls from './Navbar.module.scss';
import { NavbarSettings } from './NavbarSettings';
import { NavbarAccount } from './NavbarAccount';
import { NavbarNotifications } from './NavbarNotifications';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const authData = useSelector(getUserAuthData);
  const inited = useSelector(getUserInited);

  const onCloseModal = useCallback(() => {
    setIsAuthOpen(false);
  }, []);
  const onShowModal = useCallback(() => {
    setIsAuthOpen(true);
  }, []);

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.NavbarLeft}>iBlog</div>
      <div className={cls.NavbarRight}>
        {inited && (
          <>
            {authData ? (
              <>
                <NavbarNotifications
                  isMobile={isMobileOnly}
                  btnClassName={cls.NavbarItem}
                  btnIconClassName={cls.ItemIcon}
                />
                <NavbarAccount
                  isMobile={isMobileOnly}
                  authData={authData}
                  btnClassName={cls.NavbarItem}
                  accountBtnClassName={cls.AccountBtn}
                />
              </>
            ) : (
              <Button
                theme="apple"
                className={cls.NavbarSignin}
                onClick={onShowModal}
              >
                <SingInIcon className={cls.SingInIcon} />
                <span>{t('Sign in')}</span>
              </Button>
            )}
          </>
        )}
        <NavbarSettings
          isMobile={isMobileOnly}
          btnClassName={cls.NavbarItem}
          btnIconClassName={cls.ItemIcon}
        />
      </div>
      {isAuthOpen && <LoginModal isOpen={isAuthOpen} onClose={onCloseModal} />}
    </header>
  );
});
