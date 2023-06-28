import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  accountActions,
  getAccountReadonly,
  updateAccountData,
} from 'entities/Account';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AccountPageHeader.module.scss';

interface AccountPageHeaderProps {
  className?: string;
}

export const AccountPageHeader = ({ className }: AccountPageHeaderProps) => {
  const { t } = useTranslation('account');
  const readonly = useSelector(getAccountReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(accountActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(accountActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateAccountData());
    dispatch(accountActions.setReadOnly(true));
  }, [dispatch]);

  return (
    <div className={classNames(cls.AccountPageHeader, {}, [className])}>
      <h2 className={cls.title}>{t('Account')}</h2>
      <div className={cls.btns}>
        {readonly ? (
          <Button
            theme={ButtonTheme.APPLE}
            className={cls.btn}
            onClick={onEdit}
          >
            {t('Edit')}
          </Button>
        ) : (
          <>
            <Button
              theme={ButtonTheme.APPLE_SECONDARY}
              className={cls.btn}
              onClick={onCancelEdit}
            >
              {t('Cancel')}
            </Button>
            <Button
              theme={ButtonTheme.APPLE}
              className={cls.btn}
              onClick={onSave}
            >
              {t('Save')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
