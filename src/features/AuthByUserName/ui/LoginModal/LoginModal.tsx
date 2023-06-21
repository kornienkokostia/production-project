import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { getUserAuthData } from 'entities/User';
import { Loader, LoaderTheme } from 'shared/ui/Loader/Loader';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import cls from './LoginModal.module.scss';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
  <Modal
    className={classNames(cls.LoginModal, {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
    lazy
  >
    <Suspense fallback={<Loader theme={LoaderTheme.BIG} />}>
      <LoginFormAsync onSuccess={onClose} />
    </Suspense>
  </Modal>
);
