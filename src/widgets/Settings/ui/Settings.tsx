import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LangSwitcher } from '@/widgets/LangSwitcher';
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher';
import cls from './Settings.module.scss';

interface SettingsProps {
  className?: string;
  isMobile?: boolean;
}

export const Settings = memo(({ className, isMobile }: SettingsProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={classNames(cls.Settings, { [cls.mobile]: isMobile }, [
        className,
      ])}
    >
      <div className={cls.header}>
        <h2>{t('Settings')}</h2>
      </div>
      <div className={cls.items}>
        <div className={cls.item}>
          <p>{t('Language')}</p>
          <LangSwitcher />
        </div>
        <div className={cls.divider} />
        <div className={cls.item}>
          <p>{t('Appearance')}</p>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
});
