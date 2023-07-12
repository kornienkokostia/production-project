import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  AccountCard,
  accountActions,
  fetchAccountData,
  getAccountError,
  getAccountForm,
  getAccountFormErrors,
  getAccountIsLoading,
  getAccountReadonly,
  validateAccountData,
} from 'entities/Account';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Currancy } from 'entities/Currency';
import { Country } from 'entities/Country';

interface AditableAccountCardProps {
  className?: string;
}

export const EditableAccountCard = memo((props: AditableAccountCardProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchAccountData(id));
    }
  }, [dispatch, id]);

  const formData = useSelector(getAccountForm);
  const isLoading = useSelector(getAccountIsLoading);
  const error = useSelector(getAccountError);
  const readonly = useSelector(getAccountReadonly);
  const formErrors = useSelector(getAccountFormErrors);

  useEffect(() => {
    if (formData) {
      const vlidationData = validateAccountData(formData);
      dispatch(accountActions.updateAccountErrors(vlidationData));
    }
  }, [formData, dispatch]);

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
      const newValue = val!.replace(/[^\d]/, '');
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
      formErrors={formErrors}
    />
  );
});
