import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import AccountPopupSignOutIcon from 'shared/assets/icons/account-popup-sign-out.svg';
import AccountPopupManageAccountIcon from 'shared/assets/icons/account-popup-manage-account.svg';
import AccountPopupAdminPanelIcon from 'shared/assets/icons/account-popup-admin-panel.svg';
import { useDispatch } from 'react-redux';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { userActions } from 'entities/User';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './AccountPopup.module.scss';
import { AccountPopupElem } from '../model/types/accountPopup';
import { AccountPopupItem } from './AccountPopupItem';

interface AccountPopupProps {
  className?: string;
  username: string;
  onClosePopup: () => void;
  userId: string;
  popupOpen: boolean;
  isAdminPanelAvaliable: boolean;
}

export const AccountPopup = memo(
  ({
    className,
    username,
    onClosePopup,
    userId,
    popupOpen,
    isAdminPanelAvaliable,
  }: AccountPopupProps) => {
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
      navigate(`${RoutePath.account}${userId}`);
      onClosePopup();
    }, [navigate, onClosePopup, userId]);

    const onAdminPanel = useCallback(() => {
      navigate(RoutePath.admin_panel);
      onClosePopup();
    }, [navigate, onClosePopup]);

    const accountPopupItems: AccountPopupElem[] = useMemo(
      () => [
        ...(isAdminPanelAvaliable
          ? [
            {
              title: t('Admin Panel'),
              Icon: AccountPopupAdminPanelIcon,
              onClick: onAdminPanel,
              hasDivider: true,
            },
          ]
          : []),
        {
          title: t('Manage Account'),
          Icon: AccountPopupManageAccountIcon,
          onClick: onManageAccount,
          hasDivider: true,
        },
        {
          title: t('Sign Out'),
          Icon: AccountPopupSignOutIcon,
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
              setSelected(
                accountPopupItems[accountPopupItems.length - 1].title,
              );
            } else {
              accountPopupItems.forEach((el, i) => {
                if (el.title === selected && i > 0) {
                  setSelected(accountPopupItems[i - 1].title);
                }
              });
            }
            setShowSelected(true);
          }
          if (e.key === 'ArrowDown') {
            if (!selected) {
              setSelected(accountPopupItems[0].title);
            } else {
              accountPopupItems.forEach((el, i) => {
                if (el.title === selected && i < accountPopupItems.length - 1) {
                  setSelected(accountPopupItems[i + 1].title);
                }
              });
            }
            setShowSelected(true);
          }
          if (e.key === 'Enter' && (canPressEnter || showSelected)) {
            if (
              isAdminPanelAvaliable &&
              selected === accountPopupItems[0].title
            ) {
              onAdminPanel();
            }
            if (
              isAdminPanelAvaliable
                ? selected === accountPopupItems[1].title
                : selected === accountPopupItems[0].title
            ) {
              onManageAccount();
            }
            if (
              isAdminPanelAvaliable
                ? selected === accountPopupItems[2].title
                : selected === accountPopupItems[1].title
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
        accountPopupItems,
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
        className={classNames(cls.AccountPopup, {}, [className])}
        onMouseMove={() => {
          setShowSelected(false);
        }}
        onMouseEnter={() => setCanPressEnter(true)}
        onMouseLeave={() => setCanPressEnter(false)}
      >
        <div className={cls.header}>
          <h2>{username}</h2>
        </div>
        <div className={cls.items}>
          {accountPopupItems.map(el => (
            <AccountPopupItem
              item={el}
              selected={selected}
              setSelected={setSelected}
              showSelected={showSelected}
            />
          ))}
        </div>
      </div>
    );
  },
);
