import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getAccountData } from 'entities/Account/model/selectors/getAccountData/getAccountData';
import { getAccountIsLoading } from 'entities/Account/model/selectors/getAccountIsLoading/getAccountIsLoading';
import { getAccountError } from 'entities/Account/model/selectors/getAccountError/getAccountError';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import cls from './AccountCard.module.scss';

interface AccountCardProps {
  className?: string;
}

export const AccountCard = ({ className }: AccountCardProps) => {
  const { t } = useTranslation('account');

  const data = useSelector(getAccountData);
  const isLoading = useSelector(getAccountIsLoading);
  const error = useSelector(getAccountError);

  return (
    <div className={classNames(cls.AccountCard, {}, [className])}>
      <div className={cls.header}>
        <h2>{t('Account')}</h2>
        <Button theme={ButtonTheme.APPLE}>Edit</Button>
      </div>
      <div className={cls.data}>
        {/* <TextInput
          fieldTitle={t('First name')}
          isFocused={usernameFocused}
          setIsFocused={changeUsernameFocused}
          onChange={onChangeUsername}
          value={data?.firstname}
        /> */}
      </div>
    </div>
  );
};
