import {
  ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CloseModalIcon from 'shared/assets/icons/close-modal.svg';
import cls from './Submenu.module.scss';
import { Portal } from '../Portal/Portal';
import { Button } from '../Button/Button';

interface SubmenuProps {
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Submenu = (props: SubmenuProps) => {
  const {
    className, children, isOpen, onClose,
  } = props;
  const [isClosing, setIsClosing] = useState(false);
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const closeHandler = useCallback(() => {
    setIsClosing(true);
    timeRef.current = setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const onContentClick = (e: React.MouseEvent) => e.stopPropagation();

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  return (
    <Portal>
      <div className={classNames(cls.Submenu, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onContentClick}>
            <Button className={cls.closeBtn}>
              <CloseModalIcon className={cls.closeBtnIcon} />
            </Button>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
