import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { Submenu, SubmenuTheme } from 'shared/ui/Submenu/Submenu';
import NotificationsIcon from 'shared/assets/icons/notifications.svg';
import { NotificationList } from 'entities/Notification';

interface NavbarNotificationsProps {
  btnClassName: string;
  btnIconClassName: string;
  isMobile: boolean;
}

export const NavbarNotifications = ({
  isMobile,
  btnClassName,
  btnIconClassName,
}: NavbarNotificationsProps) => {
  const [isNotifPopupOpen, setNotifPopupOpen] = useState(false);
  const [isNotifPopupClosing, setIsNotifPopupClosing] = useState(false);

  const notifTimeRef = useRef() as MutableRefObject<
    ReturnType<typeof setTimeout>
  >;

  const onToggleNotifPopup = useCallback(() => {
    setNotifPopupOpen(prev => !prev);
  }, []);

  const closeNotifPopupHandler = useCallback(() => {
    setIsNotifPopupClosing(true);
    notifTimeRef.current = setTimeout(
      () => {
        setIsNotifPopupClosing(false);
        setNotifPopupOpen(false);
      },
      isMobile ? 400 : 200,
    );
  }, [setNotifPopupOpen]);

  useEffect(
    () => () => {
      clearTimeout(notifTimeRef.current);
    },
    [],
  );

  return (
    <>
      <Button
        theme={ButtonTheme.CLEAR}
        className={btnClassName}
        onClick={onToggleNotifPopup}>
        <NotificationsIcon className={btnIconClassName} />
      </Button>
      {isMobile ? (
        <Drawer
          isOpen={isNotifPopupOpen}
          closeHandler={closeNotifPopupHandler}
          isClosing={isNotifPopupClosing}>
          <NotificationList isMobile onClosePopup={closeNotifPopupHandler} />
        </Drawer>
      ) : (
        <Submenu
          isOpen={isNotifPopupOpen}
          closeHandler={closeNotifPopupHandler}
          theme={SubmenuTheme.NOTIFICATIONS}
          isClosing={isNotifPopupClosing}>
          <NotificationList onClosePopup={closeNotifPopupHandler} />
        </Submenu>
      )}
    </>
  );
};
