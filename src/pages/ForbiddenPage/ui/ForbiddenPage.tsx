import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import cls from './ForbiggenPage.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { appStateActions } from '@/entities/AppState';

export const ForbiddenPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(appStateActions.setContentLoaded(true));
  }, [dispatch]);

  return (
    <div className={cls.forbidden}>
      <span>{t('Forbidden page text')}</span>
      <Button theme={ButtonTheme.APPLE} onClick={() => navigate(-1)}>
        {t('Back')}
      </Button>
    </div>
  );
};
