import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Submenu.module.scss';
import { Portal } from '../Portal/Portal';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

interface SubmenuProps {
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Submenu = ({
  className,
  isOpen,
  onClose,
  children,
}: SubmenuProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const onOverlayClick = useCallback(() => {
    setIsClosing(true);
    timeRef.current = setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current);
    };
  }, []);

  const onContentClick = (e: React.MouseEvent) => e.stopPropagation();

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  return (
    <Portal>
      <div className={classNames(cls.Submenu, mods, [className])}>
        <div className={cls.overlay} onClick={onOverlayClick}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
