import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import AccountPopupSignOutIcon from 'shared/assets/icons/account-popup-sign-out.svg';
import { useDispatch } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { userActions } from 'entities/User';
import cls from './AccountPopup.module.scss';

interface AccountPopupProps {
  className?: string;
  username: string;
  onSignOutClosePopup: () => void;
}

export const AccountPopup = ({
  className,
  username,
  onSignOutClosePopup,
}: AccountPopupProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSignOut = useCallback(() => {
    dispatch(userActions.signOut());
    onSignOutClosePopup();
  }, [dispatch, onSignOutClosePopup]);

  return (
    <div className={classNames(cls.AccountPopup, {}, [className])}>
      <div className={cls.header}>
        <h2>{username}</h2>
      </div>
      <div className={cls.items}>
        <Button
          className={cls.item}
          theme={ButtonTheme.CLEAR}
          onClick={onSignOut}
        >
          <AccountPopupSignOutIcon className={cls.icon} />
          <p>{t('Sign Out')}</p>
        </Button>
      </div>
    </div>
  );
};
