import {
  MutableRefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { Submenu } from '@/shared/ui/Submenu';
import { AccountMenu } from '@/entities/AccountMenu';
import { AccountPhoto } from '@/shared/ui/AccountPhoto';
import { User, isUserAdmin, isUserManager } from '@/entities/User';

interface NavbarAccountProps {
  btnClassName: string;
  accountBtnClassName: string;
  isMobile: boolean;
  authData: User;
}

export const NavbarAccount = memo((props: NavbarAccountProps) => {
  const {
    isMobile, btnClassName, accountBtnClassName, authData,
  } = props;
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const isAdminPanelAvaliable = isAdmin || isManager;
  const [isAccountPopupClosing, setIsAccountPopupClosing] = useState(false);
  const [isAccountPopupOpen, setAccountPopupOpen] = useState(false);

  const accountTimeRef = useRef() as MutableRefObject<
    ReturnType<typeof setTimeout>
  >;

  const onToggleAccountPopup = useCallback(() => {
    setAccountPopupOpen(prev => !prev);
  }, []);

  const closeAccountPopupHandler = useCallback(() => {
    setIsAccountPopupClosing(true);
    accountTimeRef.current = setTimeout(
      () => {
        setIsAccountPopupClosing(false);
        setAccountPopupOpen(false);
      },
      isMobile ? 400 : 200,
    );
  }, [setAccountPopupOpen, isMobile]);

  useEffect(
    () => () => {
      clearTimeout(accountTimeRef.current);
    },
    [],
  );

  return (
    <>
      <Button
        theme="clear"
        className={btnClassName}
        onClick={onToggleAccountPopup}
      >
        <div className={accountBtnClassName}>
          <AccountPhoto src={authData?.avatar} />
        </div>
      </Button>
      {isMobile ? (
        <Drawer
          isOpen={isAccountPopupOpen}
          closeHandler={closeAccountPopupHandler}
          isClosing={isAccountPopupClosing}
        >
          <AccountMenu
            username={authData.username}
            onClosePopup={closeAccountPopupHandler}
            userId={authData.id}
            popupOpen={isAccountPopupOpen}
            isAdminPanelAvaliable={isAdminPanelAvaliable}
            isMobile
          />
        </Drawer>
      ) : (
        <Submenu
          isOpen={isAccountPopupOpen}
          closeHandler={closeAccountPopupHandler}
          theme="account"
          isClosing={isAccountPopupClosing}
        >
          <AccountMenu
            username={authData.username}
            onClosePopup={closeAccountPopupHandler}
            userId={authData.id}
            popupOpen={isAccountPopupOpen}
            isAdminPanelAvaliable={isAdminPanelAvaliable}
          />
        </Submenu>
      )}
    </>
  );
});
