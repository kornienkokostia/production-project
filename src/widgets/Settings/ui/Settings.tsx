import { classNames } from 'shared/lib/classNames/classNames';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import cls from './Settings.module.scss';

interface SettingsProps {
  className?: string;
}

export const Settings = ({ className }: SettingsProps) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.Settings, {}, [className])}>
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
};
