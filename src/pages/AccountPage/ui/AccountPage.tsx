import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { EditableAccountCard } from 'features/editableAccountCard';
import { useTranslation } from 'react-i18next';
import cls from './AccountPage.module.scss';
import { AccountPageHeader } from './AccountPageHeader/AccountPageHeader';

interface AccountPageProps {
  className?: string;
}

const AccountPage = ({ className }: AccountPageProps) => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('account');

  if (!id) {
    return (
      <div className={cls.AccountPage}>
        <h2>{t('Account is not found')}</h2>
      </div>
    );
  }

  return (
    <div className={classNames(cls.AccountPage, {}, [className])}>
      <AccountPageHeader id={id} />
      <EditableAccountCard id={id} />
    </div>
  );
};

export default AccountPage;
