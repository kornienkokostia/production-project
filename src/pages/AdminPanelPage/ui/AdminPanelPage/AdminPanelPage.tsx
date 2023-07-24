import { useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AdminPanelPage.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { appStateActions } from '@/entities/AppState';
import { AdminPanelPageHeader } from '../AdminPanelPageHeader/AdminPanelPageHeader';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = ({ className }: AdminPanelPageProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(appStateActions.setContentLoaded(true));
  }, [dispatch]);

  return (
    <div className={classNames(cls.AdminPanelPage, {}, [className])}>
      <AdminPanelPageHeader />
    </div>
  );
};

export default AdminPanelPage;
