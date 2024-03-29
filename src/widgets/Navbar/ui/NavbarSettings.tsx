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
import { SettingsMenu } from '@/entities/SettingsMenu';
import SettingsIcon from '@/shared/assets/icons/settings.svg';

interface NavbarSettingsProps {
  btnClassName: string;
  btnIconClassName: string;
  isMobile: boolean;
}

export const NavbarSettings = memo(
  ({ isMobile, btnClassName, btnIconClassName }: NavbarSettingsProps) => {
    const [isSettingsPopupClosing, setIsSettingsPopupClosing] = useState(false);
    const [isSettingsPopupOpen, setSettingsPopupOpen] = useState(false);

    const settingsTimeRef = useRef() as MutableRefObject<
      ReturnType<typeof setTimeout>
    >;

    const onToggleSettings = useCallback(() => {
      setSettingsPopupOpen(prev => !prev);
    }, []);

    const closeSettingsPopupHandler = useCallback(() => {
      setIsSettingsPopupClosing(true);
      settingsTimeRef.current = setTimeout(
        () => {
          setIsSettingsPopupClosing(false);
          setSettingsPopupOpen(false);
        },
        isMobile ? 400 : 200,
      );
    }, [setSettingsPopupOpen, isMobile]);

    useEffect(
      () => () => {
        clearTimeout(settingsTimeRef.current);
      },
      [],
    );

    return (
      <>
        <Button
          theme="clear"
          className={btnClassName}
          onClick={onToggleSettings}
        >
          <SettingsIcon className={btnIconClassName} />
        </Button>
        {isMobile ? (
          <Drawer
            isOpen={isSettingsPopupOpen}
            isClosing={isSettingsPopupClosing}
            closeHandler={closeSettingsPopupHandler}
          >
            <SettingsMenu isMobile />
          </Drawer>
        ) : (
          <Submenu
            isOpen={isSettingsPopupOpen}
            isClosing={isSettingsPopupClosing}
            closeHandler={closeSettingsPopupHandler}
          >
            <SettingsMenu />
          </Submenu>
        )}
      </>
    );
  },
);
