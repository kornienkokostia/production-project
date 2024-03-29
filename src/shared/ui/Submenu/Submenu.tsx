import {
  ReactNode, memo, useCallback, useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { isDesktop } from 'react-device-detect';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import CloseModalIcon from '@/shared/assets/icons/close-modal.svg';
import TriangleIcon from '@/shared/assets/icons/select-top-triangle.svg';
import cls from './Submenu.module.scss';
import { Portal } from '../Portal/Portal';
import { Button } from '../Button/Button';

export type SubmenuTheme =
  | 'settings'
  | 'account'
  | 'notifications'
  | 'sort-by'
  | 'category'
  | 'page-switcher';

interface SubmenuProps {
  className?: string;
  isOpen: boolean;
  closeHandler: () => void;
  children: ReactNode;
  theme?: SubmenuTheme;
  showTriangle?: boolean;
  isClosing: boolean;
  sidebarPadding?: boolean;
}

export const Submenu = memo((props: SubmenuProps) => {
  const {
    className,
    children,
    isOpen,
    closeHandler,
    theme = 'settings',
    showTriangle = false,
    isClosing,
    sidebarPadding,
  } = props;

  const { i18n } = useTranslation();

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
    [cls.sidebarPadding]: isDesktop && sidebarPadding,
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
});
