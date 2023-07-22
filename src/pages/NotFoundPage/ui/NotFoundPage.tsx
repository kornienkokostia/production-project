import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { appStateActions } from '@/entities/AppState';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(appStateActions.setContentLoaded(true));
  }, [dispatch]);

  return (
    <div className={classNames(cls.NotFoundPage, {}, [className])}>
      {t('Page not found')}
    </div>
  );
};
