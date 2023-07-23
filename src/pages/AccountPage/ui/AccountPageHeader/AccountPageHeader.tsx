import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { Button } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import {
  getAccountReadonly,
  getAccountIsLoading,
  getAccountData,
  getAccountFormErrors,
  accountActions,
  updateAccountData,
} from '@/features/editableAccountCard';
import cls from './AccountPageHeader.module.scss';
import { updateAuthData } from '@/entities/User/model/services/updateUserData';
import { getAccountForm } from '@/features/editableAccountCard/model/selectors/getAccountForm/getAccountForm';

interface AccountPageHeaderProps {
  className?: string;
  id?: string;
}

export const AccountPageHeader = ({
  className,
  id,
}: AccountPageHeaderProps) => {
  const { t } = useTranslation('account');
  const readonly = useSelector(getAccountReadonly);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getAccountIsLoading);
  const authData = useSelector(getUserAuthData);
  const accountData = useSelector(getAccountData);
  const canEdit = authData?.id === accountData?.id;
  const formErrors = useSelector(getAccountFormErrors);
  const formData = useSelector(getAccountForm);

  const onEdit = useCallback(() => {
    dispatch(accountActions.setReadOnly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(accountActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    if (formErrors && Object.values(formErrors).filter(el => el).length === 0) {
      dispatch(updateAccountData(id as string));
      dispatch(accountActions.setReadOnly(true));
      dispatch(updateAuthData(formData?.avatar || ''));
    }
  }, [dispatch, formErrors, id]);

  return (
    <div className={classNames(cls.AccountPageHeader, {}, [className])}>
      <h2 className={cls.title}>{t('Account')}</h2>
      {!isLoading && readonly !== undefined && canEdit && (
        <div className={cls.btns}>
          {readonly ? (
            <Button theme="apple-clear" className={cls.btn} onClick={onEdit}>
              {t('Edit')}
            </Button>
          ) : (
            <>
              <Button
                theme="apple-clear"
                className={cls.btn}
                onClick={onCancelEdit}>
                {t('Cancel')}
              </Button>
              <div className={cls.separator} />
              <Button theme="apple-clear" className={cls.btn} onClick={onSave}>
                {t('Save')}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
