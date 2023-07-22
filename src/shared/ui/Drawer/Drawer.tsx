import {
  ReactNode, memo, useCallback, useEffect,
} from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import CloseDrawerIcon from '@/shared/assets/icons/close-drawer.svg';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Button } from '../Button/Button';

interface DrawerProps {
  className?: string;
  isOpen: boolean;
  closeHandler: () => void;
  children: ReactNode;
  isClosing?: boolean;
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className, children, isOpen, closeHandler, isClosing,
  } = props;

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    },
    [closeHandler],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const onContentClick = (e: React.MouseEvent) => e.stopPropagation();

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div
            className={classNames(cls.content, {}, [])}
            onClick={onContentClick}
          >
            <div className={cls.header}>
              <Button
                theme="clear"
                className={cls.closeBtn}
                onClick={closeHandler}
              >
                <CloseDrawerIcon className={cls.closeBtnIcon} />
              </Button>
            </div>

            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
});
