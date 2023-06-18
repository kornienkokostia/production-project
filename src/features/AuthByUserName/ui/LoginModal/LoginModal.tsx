import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './LoginModal.module.scss';
import { LoginForm } from '../LoginForm/LoginForm';
import { useSelector } from 'react-redux';

import { useEffect } from 'react';
import { getUserAuthData } from 'entities/User';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  const authData = useSelector(getUserAuthData);

  useEffect(() => {
    if (authData) {
      onClose();
    }
  }, [authData]);

  return (
    <Modal
      className={classNames(cls.LoginModal, {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
    >
      <LoginForm />
    </Modal>
  );
};
