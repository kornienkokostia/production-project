import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import cls from './AccountPageHeader.module.scss';
import { getAccountReadonly } from 'features/editableAccountCard/model/selectors/getAccountReadonly/getAccountReadonly';
import { getAccountIsLoading } from 'features/editableAccountCard/model/selectors/getAccountIsLoading/getAccountIsLoading';
import { getAccountData } from 'features/editableAccountCard/model/selectors/getAccountData/getAccountData';
import { getAccountFormErrors } from 'features/editableAccountCard/model/selectors/getAccountFormErrors/getAccountFormErrors';
import { accountActions } from 'features/editableAccountCard/model/slice/accountSlice';
import { updateAccountData } from 'features/editableAccountCard/model/services/updateAccountData/updateAccountData';

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
    }
  }, [dispatch, formErrors, id]);

  return (
    <div className={classNames(cls.AccountPageHeader, {}, [className])}>
      <h2 className={cls.title}>{t('Account')}</h2>
      {!isLoading && readonly !== undefined && canEdit && (
        <div className={cls.btns}>
          {readonly ? (
            <Button
              theme={ButtonTheme.APPLE_CLEAR}
              className={cls.btn}
              onClick={onEdit}>
              {t('Edit')}
            </Button>
          ) : (
            <>
              <Button
                theme={ButtonTheme.APPLE_CLEAR}
                className={cls.btn}
                onClick={onCancelEdit}>
                {t('Cancel')}
              </Button>
              <div className={cls.separator} />
              <Button
                theme={ButtonTheme.APPLE_CLEAR}
                className={cls.btn}
                onClick={onSave}>
                {t('Save')}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
