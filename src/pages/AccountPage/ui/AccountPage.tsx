import {
  AccountCard,
  AccountErrors,
  accountActions,
  accountReducer,
  fetchAccountData,
  getAccountData,
  getAccountError,
  getAccountForm,
  getAccountIsLoading,
  getAccountReadonly,
  validateAccountData,
} from 'entities/Account';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AccountPage.module.scss';
import { AccountPageHeader } from './AccountPageHeader/AccountPageHeader';
import { Currancy } from 'entities/Currency';
import { Country } from 'entities/Country';

const initialReducers: ReducersList = {
  account: accountReducer,
};

interface AccountPageProps {
  className?: string;
}

const AccountPage = ({ className }: AccountPageProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAccountData());
  }, [dispatch]);

  const formData = useSelector(getAccountForm);
  const isLoading = useSelector(getAccountIsLoading);
  const error = useSelector(getAccountError);
  const readonly = useSelector(getAccountReadonly);
  const [accountErrors, setAccountErrors] = useState<AccountErrors>();

  useEffect(() => {
    if (formData) {
      const fromErrors = validateAccountData(formData);
      setAccountErrors(fromErrors);
    }
  }, [formData]);

  const onChangeFirstName = useCallback(
    (val?: string) => {
      dispatch(accountActions.updateAccount({ firstname: val || '' }));
    },
    [dispatch],
  );

  const onChangeLastName = useCallback(
    (val?: string) => {
      dispatch(accountActions.updateAccount({ lastname: val || '' }));
    },
    [dispatch],
  );

  const onChangeAge = useCallback(
    (val?: string) => {
      const newValue = val!.replace(new RegExp(/[^\d\+]/, 'ig'), '');
      dispatch(accountActions.updateAccount({ age: Number(newValue || 0) }));
    },
    [dispatch],
  );

  const onChangeCity = useCallback(
    (val?: string) => {
      dispatch(accountActions.updateAccount({ city: val || '' }));
    },
    [dispatch],
  );

  const onChangePhoto = useCallback(
    (val?: string) => {
      dispatch(accountActions.updateAccount({ avatar: val || '' }));
    },
    [dispatch],
  );

  const onChangeUsername = useCallback(
    (val?: string) => {
      dispatch(accountActions.updateAccount({ username: val || '' }));
    },
    [dispatch],
  );

  const onChangeCurrency = useCallback(
    (val?: Currancy) => {
      dispatch(accountActions.updateAccount({ currency: val }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    (val?: Country) => {
      dispatch(accountActions.updateAccount({ country: val }));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.AccountPage, {}, [className])}>
        <AccountPageHeader formErrors={accountErrors} />
        <AccountCard
          data={formData}
          isLoading={isLoading}
          error={error}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangePhoto={onChangePhoto}
          onChangeUsername={onChangeUsername}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
          readonly={readonly}
          formErrors={accountErrors}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default AccountPage;
