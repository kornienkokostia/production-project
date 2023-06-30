import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  AccountErrors,
  accountActions,
  getAccountIsLoading,
  getAccountReadonly,
  updateAccountData,
} from 'entities/Account';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AccountPageHeader.module.scss';

interface AccountPageHeaderProps {
  className?: string;
  formErrors?: AccountErrors;
}

export const AccountPageHeader = ({
  className,
  formErrors,
}: AccountPageHeaderProps) => {
  const { t } = useTranslation('account');
  const readonly = useSelector(getAccountReadonly);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getAccountIsLoading);

  const onEdit = useCallback(() => {
    dispatch(accountActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(accountActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    if (formErrors && Object.values(formErrors).filter(el => el).length === 0) {
      dispatch(updateAccountData());
      dispatch(accountActions.setReadOnly(true));
    }
  }, [dispatch, formErrors]);

  return (
    <div className={classNames(cls.AccountPageHeader, {}, [className])}>
      <h2 className={cls.title}>{t('Account')}</h2>
      {!isLoading && (
        <div className={cls.btns}>
          {readonly ? (
            <Button
              theme={ButtonTheme.CLEAR}
              className={cls.btn}
              onClick={onEdit}
            >
              {t('Edit')}
            </Button>
          ) : (
            <>
              <Button
                theme={ButtonTheme.CLEAR}
                className={cls.btn}
                onClick={onCancelEdit}
              >
                {t('Cancel')}
              </Button>
              <div className={cls.separator} />
              <Button
                theme={ButtonTheme.CLEAR}
                className={cls.btn}
                onClick={onSave}
              >
                {t('Save')}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
