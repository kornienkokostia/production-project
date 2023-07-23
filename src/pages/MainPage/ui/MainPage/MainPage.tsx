import { useEffect } from 'react';
import { appStateActions } from '@/entities/AppState';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './MainPage.module.scss';
import { MainPageHeader } from '../MainPageHeader/MainPageHeader';

const MainPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(appStateActions.setContentLoaded(true));
  }, [dispatch]);

  return (
    <div className={cls.MainPage}>
      <MainPageHeader />
      <div className={cls.MainPageInfo}>
        <div>
          <h3>Accounts:</h3>
          <br />
          <p>username: user</p>
          <p>password: 123</p>
          <br />
          <p>username: admin</p>
          <p>password: 123</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
