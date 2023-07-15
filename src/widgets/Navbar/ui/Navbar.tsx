import React, {
  MutableRefObject,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import SingInIcon from 'shared/assets/icons/singin-btn.svg';
import { LoginModal } from 'features/AuthByUserName';
import SettingsIcon from 'shared/assets/icons/settings.svg';
import NotificationsIcon from 'shared/assets/icons/notifications.svg';
import { Submenu, SubmenuTheme } from 'shared/ui/Submenu/Submenu';
import { getUserAuthData, isUserAdmin, isUserManager } from 'entities/User';
import { useSelector } from 'react-redux';
import { Settings } from 'widgets/Settings';
import { AccountPopup } from 'widgets/AccountPopup';
import { AccountPhoto } from 'shared/ui/AccountPhoto/AccountPhoto';
import { NotificationList } from 'entities/Notification';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false);
  const [isNotifPopupOpen, setNotifPopupOpen] = useState(false);
  const authData = useSelector(getUserAuthData);
  const [isAccountPopupClosing, setIsAccountPopupClosing] = useState(false);
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const isAdminPanelAvaliable = isAdmin || isManager;

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
  const onToggleNotifPopup = useCallback(() => {
    setNotifPopupOpen(prev => !prev);
  }, []);

  const closeAccountPopupHandler = useCallback(() => {
    setIsAccountPopupClosing(true);
    timeRef.current = setTimeout(() => {
      setIsAccountPopupClosing(false);
      setAccountPopupOpen(false);
    }, 200);
  }, [setAccountPopupOpen]);

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.NavbarLeft}>iBlog</div>
      <div className={cls.NavbarRight}>
        {authData ? (
          <>
            <Button
              theme={ButtonTheme.CLEAR}
              className={cls.NavbarItem}
              onClick={onToggleNotifPopup}
            >
              <NotificationsIcon className={cls.ItemIcon} />
            </Button>
            <Button
              theme={ButtonTheme.CLEAR}
              className={cls.NavbarItem}
              onClick={onToggleAccountPopup}
            >
              <div className={cls.AccountBtn}>
                <AccountPhoto src={authData.avatar} />
              </div>
            </Button>
          </>
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
      {isAuthOpen && <LoginModal isOpen={isAuthOpen} onClose={onCloseModal} />}
      <Submenu isOpen={isSettingsOpen} onClose={onToggleSettings}>
        <Settings />
      </Submenu>
      {authData && (
        <>
          <Submenu
            isOpen={isNotifPopupOpen}
            onClose={onToggleNotifPopup}
            theme={SubmenuTheme.NOTIFICATIONS}
          >
            <NotificationList />
          </Submenu>
          <Submenu
            isOpen={isAccountPopupOpen}
            onClose={onToggleAccountPopup}
            theme={SubmenuTheme.ACCOUNT}
            passedIsClosing={isAccountPopupClosing}
          >
            <AccountPopup
              username={authData.username}
              onClosePopup={closeAccountPopupHandler}
              userId={authData.id}
              popupOpen={isAccountPopupOpen}
              isAdminPanelAvaliable={isAdminPanelAvaliable}
            />
          </Submenu>
        </>
      )}
    </header>
  );
});
