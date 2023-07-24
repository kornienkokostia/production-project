import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AdminPanelPageHeader.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@/shared/assets/icons/arrow-back.svg';

interface AdminPanelPageHeaderProps {
  className?: string;
}

export const AdminPanelPageHeader = ({
  className,
}: AdminPanelPageHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <div className={classNames(cls.AdminPanelPageHeader, {}, [className])}>
      <Button theme="apple-clear" onClick={onClick}>
        <ArrowBackIcon className={cls.btnIcon} />
        {t('Back')}
      </Button>
      <h2 className={cls.title}>{t('Admin Panel')}</h2>
    </div>
  );
};
