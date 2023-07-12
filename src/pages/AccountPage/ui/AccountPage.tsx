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
import { Currancy } from 'entities/Currency';
import { Country } from 'entities/Country';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import cls from './AccountPage.module.scss';
import { AccountPageHeader } from './AccountPageHeader/AccountPageHeader';
import { EditableAccountCard } from 'features/editableAccountCard';

const initialReducers: ReducersList = {
  account: accountReducer,
};

interface AccountPageProps {
  className?: string;
}

const AccountPage = ({ className }: AccountPageProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.AccountPage, {}, [className])}>
        <AccountPageHeader id={id} />
        <EditableAccountCard />
      </div>
    </DynamicModuleLoader>
  );
};

export default AccountPage;
