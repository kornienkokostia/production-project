import {
  ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import CloseModalIcon from 'shared/assets/icons/close-modal.svg';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';
import { Button, ButtonTheme } from '../Button/Button';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
  const {
    className, children, isOpen, onClose, lazy,
  } = props;
  // const [isClosing, setIsClosing] = useState(false);
  // const timeRef = useRef<ReturnType<typeof setTimeout>>();
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    onClose();
    // if (onClose) {
    //   setIsClosing(true);
    //   timeRef.current = setTimeout(() => {
    //     setIsClosing(false);
    //     onClose();
    //   }, 200);
    // }
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
      // clearTimeout(timeRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const onContentClick = (e: React.MouseEvent) => e.stopPropagation();

  const mods: Mods = {
    [cls.opened]: isOpen,
    // [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}
      >
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onContentClick}>
            <Button
              className={cls.closeBtn}
              theme={ButtonTheme.CLEAR}
              onClick={closeHandler}
            >
              <CloseModalIcon className={cls.closeBtnIcon} />
            </Button>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
