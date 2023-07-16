import {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import CloseModalIcon from 'shared/assets/icons/close-modal.svg';
import TriangleIcon from 'shared/assets/icons/select-top-triangle.svg';
import { useTranslation } from 'react-i18next';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Button, ButtonTheme } from '../Button/Button';

interface DrawerProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  passedIsClosing?: boolean;
}

export const Drawer = (props: DrawerProps) => {
  const { className, children, isOpen, onClose, passedIsClosing } = props;
  const [isClosing, setIsClosing] = useState(false);
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const { i18n } = useTranslation();

  const closeHandler = useCallback(() => {
    setIsClosing(true);
    timeRef.current = setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

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
      clearTimeout(timeRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const onContentClick = (e: React.MouseEvent) => e.stopPropagation();

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: passedIsClosing || isClosing,
  };

  return (
    <Portal>
      <div className={classNames(cls.Drawer, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div
            className={classNames(cls.content, {}, [])}
            onClick={onContentClick}>
            <div className={cls.header}>
              <Button
                theme={ButtonTheme.CLEAR}
                className={cls.closeBtn}
                onClick={closeHandler}>
                <CloseModalIcon className={cls.closeBtnIcon} />
              </Button>
            </div>

            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
