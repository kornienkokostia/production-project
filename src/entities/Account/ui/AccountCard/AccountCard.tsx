import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'shared/ui/TextInput/TextInput';
import { Loader } from 'shared/ui/Loader/Loader';
import { useEffect, useState } from 'react';
import cls from './AccountCard.module.scss';
import { Account } from '../../model/types/account';
import { AccountPhoto } from 'shared/ui/AccountPhoto/AccountPhoto';
import { Currancy, CurrencySelect } from 'entities/Currency';
import { Country } from 'entities/Country/model/types/country';
import { CountrySelect } from 'entities/Country';

interface AccountCardProps {
  className?: string;
  data?: Account;
  isLoading?: boolean;
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
}

export const AccountCard = (props: AccountCardProps) => {
  const { t } = useTranslation('account');
  const {
    className,
    data,
    isLoading,
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
  } = props;

  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isAgeFocused, setIsAgeFocused] = useState(false);
  const [isCityFocused, setIsCityFocused] = useState(false);
  const [isPhotoFocused, setIsPhotoFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  useEffect(() => {
    if (data?.firstname) {
      setIsFirstNameFocused(true);
    }
    if (data?.lastname) {
      setIsLastNameFocused(true);
    }
    if (data?.age) {
      setIsAgeFocused(true);
    }
    if (data?.city) {
      setIsCityFocused(true);
    }
    if (data?.avatar) {
      setIsPhotoFocused(true);
    }
    if (data?.username) {
      setIsUsernameFocused(true);
    }
  }, [data]);

  if (isLoading || isLoading === undefined) {
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
      <div
        className={classNames(cls.AccountCard, {}, [className, cls.loading])}
      >
        <h2>{t('Account is not found')}</h2>
      </div>
    );
  }

  return (
    <div className={classNames(cls.AccountCard, {}, [className])}>
      <div className={cls.data}>
        <AccountPhoto
          src={data?.avatar}
          alt="Photo"
          className={cls.AccountPhoto}
        />
        <TextInput
          fieldTitle={t('First name')}
          isFocused={isFirstNameFocused}
          setIsFocused={setIsFirstNameFocused}
          onChange={onChangeFirstName}
          value={data?.firstname}
          readonly={readonly}
        />
        <TextInput
          fieldTitle={t('Last name')}
          isFocused={isLastNameFocused}
          setIsFocused={setIsLastNameFocused}
          onChange={onChangeLastName}
          value={data?.lastname}
          readonly={readonly}
        />
        <TextInput
          fieldTitle={t('Age')}
          isFocused={isAgeFocused}
          setIsFocused={setIsAgeFocused}
          onChange={onChangeAge}
          value={data?.age}
          readonly={readonly}
        />
        <TextInput
          fieldTitle={t('City')}
          isFocused={isCityFocused}
          setIsFocused={setIsCityFocused}
          onChange={onChangeCity}
          value={data?.city}
          readonly={readonly}
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
