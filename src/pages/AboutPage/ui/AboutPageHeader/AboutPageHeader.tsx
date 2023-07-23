import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AboutPageHeader.module.scss';

interface AboutPageHeaderProps {
  className?: string;
}

export const AboutPageHeader = ({ className }: AboutPageHeaderProps) => {
  const { t } = useTranslation('about');
  return (
    <div className={classNames(cls.AboutPageHeader, {}, [className])}>
      <h2 className={cls.title}>{t('About')}</h2>
    </div>
  );
};
