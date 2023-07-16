import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import cls from './ForbiggenPage.module.scss';

export const ForbiddenPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={cls.forbidden}>
      <span>{t('Forbidden page text')}</span>
      <Button theme={ButtonTheme.APPLE} onClick={() => navigate(-1)}>
        {t('Back')}
      </Button>
    </div>
  );
};
