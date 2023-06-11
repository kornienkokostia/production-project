import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Modal } from 'shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import SingInIcon from 'shared/assets/icons/singin-btn.svg';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthOpen((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.APPLE}
        className={cls.links}
        onClick={onToggleModal}
      >
        <SingInIcon className={cls.SingInIcon} />
        <span>{t('Sign in')}</span>
      </Button>
      <Modal isOpen={isAuthOpen} onClose={onToggleModal}>
        Some text jsdskdhcshdcskdhscsd csdc sdc sdc sd csd c sdcsd dc d s c s c
        sc sdc sd sdcsdcdsc sdc sdc sd csd sdcsdc sdcsdcsdc sdcscsdc c vfgb
        fgbfgbfgbfb
      </Modal>
    </div>
  );
};
