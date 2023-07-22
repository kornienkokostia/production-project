import {
  MutableRefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { Submenu } from '@/shared/ui/Submenu';
import NotificationsIcon from '@/shared/assets/icons/notifications.svg';
import { NotificationList } from '@/entities/Notification';

interface NavbarNotificationsProps {
  btnClassName: string;
  btnIconClassName: string;
  isMobile: boolean;
}

export const NavbarNotifications = memo(
  ({ isMobile, btnClassName, btnIconClassName }: NavbarNotificationsProps) => {
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
    }, [setNotifPopupOpen, isMobile]);

    useEffect(
      () => () => {
        clearTimeout(notifTimeRef.current);
      },
      [],
    );

    return (
      <>
        <Button
          theme="clear"
          className={btnClassName}
          onClick={onToggleNotifPopup}
        >
          <NotificationsIcon className={btnIconClassName} />
        </Button>
        {isMobile ? (
          <Drawer
            isOpen={isNotifPopupOpen}
            closeHandler={closeNotifPopupHandler}
            isClosing={isNotifPopupClosing}
          >
            <NotificationList isMobile onClosePopup={closeNotifPopupHandler} />
          </Drawer>
        ) : (
          <Submenu
            isOpen={isNotifPopupOpen}
            closeHandler={closeNotifPopupHandler}
            theme="notifications"
            isClosing={isNotifPopupClosing}
          >
            <NotificationList onClosePopup={closeNotifPopupHandler} />
          </Submenu>
        )}
      </>
    );
  },
);
