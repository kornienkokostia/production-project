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
import cls from './Submenu.module.scss';
import { Portal } from '../Portal/Portal';
import { Button } from '../Button/Button';

export enum SubmenuTheme {
  SETTINGS = 'settings',
  ACCOUNT = 'account',
  SORTBY = 'sort-by',
  CATEGORY = 'category',
}

interface SubmenuProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  theme?: SubmenuTheme;
  showTriangle?: boolean;
  passedIsClosing?: boolean;
  sidebarPadding?: boolean;
}

export const Submenu = (props: SubmenuProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    theme = SubmenuTheme.SETTINGS,
    showTriangle = false,
    passedIsClosing,
    sidebarPadding,
  } = props;
  const [isClosing, setIsClosing] = useState(false);
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const { i18n } = useTranslation();

  const closeHandler = useCallback(() => {
    setIsClosing(true);
    timeRef.current = setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
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
    [cls.sidebarPadding]: sidebarPadding,
  };

  return (
    <Portal>
      <div className={classNames(cls.Submenu, mods, [className, cls[theme]])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div
            className={classNames(
              cls.content,
              { [cls.showTriangle]: showTriangle },
              [],
            )}
            onClick={onContentClick}
          >
            <Button className={cls.closeBtn}>
              <CloseModalIcon className={cls.closeBtnIcon} />
            </Button>
            {showTriangle && (
              <TriangleIcon
                className={classNames(cls.triangle, {}, [cls[i18n.language]])}
              />
            )}
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
