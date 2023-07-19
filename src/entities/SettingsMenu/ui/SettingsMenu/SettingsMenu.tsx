import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SettingsLangSwitcher } from '../SettingsLangSwitcher/SettingsLangSwitcher';
import { SettingsThemeSwitcher } from '../SettingsThemeSwitcher/SettingsThemeSwitcher';
import cls from './SettingsMenu.module.scss';

interface SettingsMenuProps {
  className?: string;
  isMobile?: boolean;
}

export const SettingsMenu = memo(
  ({ className, isMobile }: SettingsMenuProps) => {
    const { t } = useTranslation();
    return (
      <div
        className={classNames(cls.SettingsMenu, { [cls.mobile]: isMobile }, [
          className,
        ])}
      >
        <div className={cls.header}>
          <h2>{t('Settings')}</h2>
        </div>
        <div className={cls.items}>
          <div className={cls.item}>
            <p>{t('Language')}</p>
            <SettingsLangSwitcher />
          </div>
          <div className={cls.divider} />
          <div className={cls.item}>
            <p>{t('Appearance')}</p>
            <SettingsThemeSwitcher />
          </div>
        </div>
      </div>
    );
  },
);
