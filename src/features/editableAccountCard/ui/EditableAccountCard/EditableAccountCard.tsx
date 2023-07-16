import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Currancy } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { AccountCard } from '@/entities/Account';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchAccountData } from '../../model/services/fetchAccountData/fetchAccountData';
import { getAccountForm } from '../../model/selectors/getAccountForm/getAccountForm';
import { getAccountIsLoading } from '../../model/selectors/getAccountIsLoading/getAccountIsLoading';
import { getAccountError } from '../../model/selectors/getAccountError/getAccountError';
import { getAccountReadonly } from '../../model/selectors/getAccountReadonly/getAccountReadonly';
import { getAccountFormErrors } from '../../model/selectors/getAccountFormErrors/getAccountFormErrors';
import { validateAccountData } from '../../model/services/validateAccountData/validateAccountData';
import { accountActions, accountReducer } from '../../model/slice/accountSlice';

interface AditableAccountCardProps {
  className?: string;
  id: string;
}

const initialReducers: ReducersList = {
  account: accountReducer,
};

export const EditableAccountCard = memo((props: AditableAccountCardProps) => {
  const { className, id } = props;
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
    <DynamicModuleLoader reducers={initialReducers}>
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
    </DynamicModuleLoader>
  );
});
