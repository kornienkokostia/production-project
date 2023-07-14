import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = ({ className }: AdminPanelPageProps) => (
  <div className={classNames(cls.AdminPanelPage, {}, [className])}>
    Admin Panel
  </div>
);

export default AdminPanelPage;
