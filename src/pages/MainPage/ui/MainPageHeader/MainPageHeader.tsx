import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainPageHeader.module.scss';

interface MainPageHeaderProps {
  className?: string;
}

export const MainPageHeader = ({ className }: MainPageHeaderProps) => {
  const { t } = useTranslation('main');
  return (
    <div className={classNames(cls.MainPageHeader, {}, [className])}>
      <h2 className={cls.title}>{t('Home')}</h2>
    </div>
  );
};
