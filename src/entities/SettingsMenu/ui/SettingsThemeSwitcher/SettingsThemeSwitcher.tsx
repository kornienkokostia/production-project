import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import cls from './SettingsThemeSwitcher.module.scss';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface SettingsThemeSwitcherProps {
  className?: string;
}

export const SettingsThemeSwitcher = memo(
  ({ className }: SettingsThemeSwitcherProps) => {
    const { theme, toggleLightTheme, toggleDarkTheme } = useTheme();
    const { t } = useTranslation();

    return (
      <div className={classNames(cls.SettingsThemeSwitcher, {}, [className])}>
        <div
          className={classNames(cls.active, {}, [
            theme === Theme.LIGHT ? cls.light : cls.dark,
          ])}
        />
        <Button
          className={classNames(cls.item, {}, [])}
          theme={ButtonTheme.CLEAR}
          onClick={toggleLightTheme}
        >
          {t('Light')}
        </Button>
        <Button
          className={classNames(cls.item, {}, [])}
          theme={ButtonTheme.CLEAR}
          onClick={toggleDarkTheme}
        >
          {t('Dark')}
        </Button>
      </div>
    );
  },
);
