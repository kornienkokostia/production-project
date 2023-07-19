import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import AccountMenuSignOutIcon from '@/shared/assets/icons/account-popup-sign-out.svg';
import AccountMenuManageAccountIcon from '@/shared/assets/icons/account-popup-manage-account.svg';
import AccountMenuAdminPanelIcon from '@/shared/assets/icons/account-popup-admin-panel.svg';
import { userActions } from '@/entities/User';
import { getRouteAccount, getRouteAdmin } from '@/shared/const/router';
import cls from './AccountMenu.module.scss';
import { AccountMenuElem } from '../model/types/accountMenu';
import { AccountMenuItem } from './AccountMenuItem';

interface AccountMenuProps {
  className?: string;
  username: string;
  onClosePopup: () => void;
  userId: string;
  popupOpen: boolean;
  isAdminPanelAvaliable: boolean;
  isMobile?: boolean;
}

export const AccountMenu = memo(
  ({
    className,
    username,
    onClosePopup,
    userId,
    popupOpen,
    isAdminPanelAvaliable,
    isMobile,
  }: AccountMenuProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string>('');
    const [showSelected, setShowSelected] = useState<boolean>(false);
    const [canPressEnter, setCanPressEnter] = useState<boolean>(false);

    const onSignOut = useCallback(() => {
      dispatch(userActions.signOut());
      onClosePopup();
    }, [dispatch, onClosePopup]);

    const onManageAccount = useCallback(() => {
      navigate(getRouteAccount(userId));
      onClosePopup();
    }, [navigate, onClosePopup, userId]);

    const onAdminPanel = useCallback(() => {
      navigate(getRouteAdmin());
      onClosePopup();
    }, [navigate, onClosePopup]);

    const AccountMenuItems: AccountMenuElem[] = useMemo(
      () => [
        ...(isAdminPanelAvaliable
          ? [
              {
                title: t('Admin Panel'),
                Icon: AccountMenuAdminPanelIcon,
                onClick: onAdminPanel,
                hasDivider: true,
              },
            ]
          : []),
        {
          title: t('Manage Account'),
          Icon: AccountMenuManageAccountIcon,
          onClick: onManageAccount,
          hasDivider: true,
        },
        {
          title: t('Sign Out'),
          Icon: AccountMenuSignOutIcon,
          onClick: onSignOut,
          hasDivider: false,
        },
      ],
      [onManageAccount, onSignOut, t, isAdminPanelAvaliable, onAdminPanel],
    );

    useEffect(() => {
      if (!popupOpen) setSelected('');
    }, [popupOpen]);

    const onKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (popupOpen) {
          if (e.key === 'ArrowUp') {
            if (!selected) {
              setSelected(AccountMenuItems[AccountMenuItems.length - 1].title);
            } else {
              AccountMenuItems.forEach((el, i) => {
                if (el.title === selected && i > 0) {
                  setSelected(AccountMenuItems[i - 1].title);
                }
              });
            }
            setShowSelected(true);
          }
          if (e.key === 'ArrowDown') {
            if (!selected) {
              setSelected(AccountMenuItems[0].title);
            } else {
              AccountMenuItems.forEach((el, i) => {
                if (el.title === selected && i < AccountMenuItems.length - 1) {
                  setSelected(AccountMenuItems[i + 1].title);
                }
              });
            }
            setShowSelected(true);
          }
          if (e.key === 'Enter' && (canPressEnter || showSelected)) {
            if (
              isAdminPanelAvaliable &&
              selected === AccountMenuItems[0].title
            ) {
              onAdminPanel();
            }
            if (
              isAdminPanelAvaliable
                ? selected === AccountMenuItems[1].title
                : selected === AccountMenuItems[0].title
            ) {
              onManageAccount();
            }
            if (
              isAdminPanelAvaliable
                ? selected === AccountMenuItems[2].title
                : selected === AccountMenuItems[1].title
            ) {
              onSignOut();
            }
          }
        }
      },
      [
        popupOpen,
        selected,
        showSelected,
        AccountMenuItems,
        canPressEnter,
        onSignOut,
        onManageAccount,
        isAdminPanelAvaliable,
        onAdminPanel,
      ],
    );

    useEffect(() => {
      window.addEventListener('keydown', onKeyDown);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
      };
    }, [onKeyDown]);

    return (
      <div
        className={classNames(cls.AccountMenu, { [cls.mobile]: isMobile }, [
          className,
        ])}
        onMouseMove={() => {
          setShowSelected(false);
        }}
        onMouseEnter={() => setCanPressEnter(true)}
        onMouseLeave={() => setCanPressEnter(false)}>
        <div className={cls.header}>
          <h2>{username}</h2>
        </div>
        <div className={cls.items}>
          {AccountMenuItems.map((el, i) => (
            <AccountMenuItem
              item={el}
              selected={selected}
              setSelected={setSelected}
              showSelected={showSelected}
              key={`account-popup-item-${i}`}
            />
          ))}
        </div>
      </div>
    );
  },
);
