import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import cls from './SettingsThemeSwitcher.module.scss';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

interface SettingsThemeSwitcherProps {
  className?: string;
}

export const SettingsThemeSwitcher = memo(
  ({ className }: SettingsThemeSwitcherProps) => {
    const { theme, toggleLightTheme, toggleDarkTheme } = useTheme();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onToggleLightHandler = useCallback(() => {
      const curTheme = Theme.LIGHT;
      toggleLightTheme(() => {
        dispatch(saveJsonSettings({ theme: curTheme }));
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, curTheme);
      });
    }, [toggleLightTheme, dispatch]);

    const onToggleDarkHandler = useCallback(() => {
      const curTheme = Theme.DARK;
      toggleDarkTheme(() => {
        dispatch(saveJsonSettings({ theme: curTheme }));
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, curTheme);
      });
    }, [toggleDarkTheme, dispatch]);

    return (
      <div className={classNames(cls.SettingsThemeSwitcher, {}, [className])}>
        <div
          className={classNames(cls.active, {}, [
            theme === Theme.LIGHT ? cls.light : cls.dark,
          ])}
        />
        <Button
          className={classNames(cls.item, {}, [])}
          theme="clear"
          onClick={onToggleLightHandler}
        >
          {t('Light')}
        </Button>
        <Button
          className={classNames(cls.item, {}, [])}
          theme="clear"
          onClick={onToggleDarkHandler}
        >
          {t('Dark')}
        </Button>
      </div>
    );
  },
);
