import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { ReactNode } from 'react';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose } = props;

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
  };

  return (
    <div className={classNames(cls.Modal, mods, [className])}>
      <div className={cls.overlay}>
        <div className={cls.content}>{children}</div>
      </div>
    </div>
  );
};
