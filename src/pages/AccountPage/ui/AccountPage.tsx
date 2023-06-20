import { classNames } from 'shared/lib/classNames/classNames';

interface AccountPageProps {
  className?: string;
}

const AccountPage = ({ className }: AccountPageProps) => {
  return <div className={classNames('', {}, [className])}>Account page</div>;
};

export default AccountPage;
