import {
  AccountCard,
  accountReducer,
  fetchAccountData,
} from 'entities/Account';
import { useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

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

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>
        <AccountCard />
      </div>
    </DynamicModuleLoader>
  );
};

export default AccountPage;
