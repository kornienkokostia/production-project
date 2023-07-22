import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TextInput } from '@/shared/ui/TextInput';
import { Loader } from '@/shared/ui/Loader';
import { AccountPhoto } from '@/shared/ui/AccountPhoto';
import { Currancy, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { AccountErrors } from '@/shared/types/account';
import { Account } from '../../model/types/account';
import cls from './AccountCard.module.scss';

interface AccountCardProps {
  className?: string;
  data?: Account;
  error?: string;
  readonly?: boolean;
  onChangeFirstName: (val?: string) => void;
  onChangeLastName: (val?: string) => void;
  onChangeAge: (val?: string) => void;
  onChangeCity: (val?: string) => void;
  onChangePhoto: (val?: string) => void;
  onChangeUsername: (val?: string) => void;
  onChangeCurrency: (val?: Currancy) => void;
  onChangeCountry: (val?: Country) => void;
  formErrors?: AccountErrors;
}

export const AccountCard = (props: AccountCardProps) => {
  const { t } = useTranslation('account');
  const {
    className,
    data,
    error,
    readonly,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCity,
    onChangePhoto,
    onChangeUsername,
    onChangeCurrency,
    onChangeCountry,
    formErrors,
  } = props;

  const [isFirstNameFocused, setIsFirstNameFocused] = useState(true);
  const [isLastNameFocused, setIsLastNameFocused] = useState(true);
  const [isAgeFocused, setIsAgeFocused] = useState(true);
  const [isCityFocused, setIsCityFocused] = useState(true);
  const [isPhotoFocused, setIsPhotoFocused] = useState(true);
  const [isUsernameFocused, setIsUsernameFocused] = useState(true);

  useEffect(() => {
    if (data && !data.avatar) {
      setIsPhotoFocused(false);
    }
    if (readonly) {
      setIsFirstNameFocused(true);
      setIsLastNameFocused(true);
      setIsAgeFocused(true);
      setIsCityFocused(true);
      setIsUsernameFocused(true);
    }
  }, [data, readonly]);

  if (!data) {
    return (
      <div
        className={classNames(cls.AccountCard, {}, [className, cls.loading])}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.AccountCard, {}, [className, cls.error])}>
        <h2>{t('Account is not found')}</h2>
      </div>
    );
  }

  return (
    <div className={classNames(cls.AccountCard, {}, [className])}>
      <div className={cls.data}>
        <AccountPhoto src={data?.avatar} className={cls.AccountPhoto} />
        <TextInput
          fieldTitle={t('First name')}
          isFocused={isFirstNameFocused}
          setIsFocused={setIsFirstNameFocused}
          onChange={onChangeFirstName}
          value={data?.firstname}
          readonly={readonly}
          error={formErrors?.firstname}
          errorMesssage={t('Enter a first name')}
        />
        <TextInput
          fieldTitle={t('Last name')}
          isFocused={isLastNameFocused}
          setIsFocused={setIsLastNameFocused}
          onChange={onChangeLastName}
          value={data?.lastname}
          readonly={readonly}
          error={formErrors?.lastname}
          errorMesssage={t('Enter a last name')}
        />
        <TextInput
          fieldTitle={t('Age')}
          isFocused={isAgeFocused}
          setIsFocused={setIsAgeFocused}
          onChange={onChangeAge}
          value={data?.age}
          readonly={readonly}
          error={formErrors?.age}
          errorMesssage={t('Enter an age')}
        />
        <TextInput
          fieldTitle={t('City')}
          isFocused={isCityFocused}
          setIsFocused={setIsCityFocused}
          onChange={onChangeCity}
          value={data?.city}
          readonly={readonly}
          error={formErrors?.city}
          errorMesssage={t('Enter a city')}
        />
        <TextInput
          fieldTitle={t('Photo')}
          isFocused={isPhotoFocused}
          setIsFocused={setIsPhotoFocused}
          onChange={onChangePhoto}
          value={data?.avatar}
          readonly={readonly}
        />
        <TextInput
          fieldTitle={t('Username')}
          isFocused={isUsernameFocused}
          setIsFocused={setIsUsernameFocused}
          onChange={onChangeUsername}
          value={data?.username}
          readonly={readonly}
          error={formErrors?.username}
          errorMesssage={t('Enter a username')}
        />
        <CurrencySelect
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
        />
        <CountrySelect
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
        />
      </div>
    </div>
  );
};
