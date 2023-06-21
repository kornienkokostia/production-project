import { accountReducer } from 'entities/Account';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const initialReducers: ReducersList = {
  account: accountReducer,
};

interface AccountPageProps {
  className?: string;
}

const AccountPage = ({ className }: AccountPageProps) => {
  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>Account page</div>
    </DynamicModuleLoader>
  );
};

export default AccountPage;
