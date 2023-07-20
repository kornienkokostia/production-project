import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import cls from './SettingsThemeSwitcher.module.scss';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface SettingsThemeSwitcherProps {
  className?: string;
}

export const SettingsThemeSwitcher = memo(
  ({ className }: SettingsThemeSwitcherProps) => {
    const { theme, toggleLightTheme, toggleDarkTheme } = useTheme();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onToggleLightHandler = useCallback(() => {
      toggleLightTheme(() => {
        dispatch(saveJsonSettings({ theme: Theme.LIGHT }));
      });
    }, [toggleLightTheme, dispatch]);

    const onToggleDarkHandler = useCallback(() => {
      toggleDarkTheme(() => {
        dispatch(saveJsonSettings({ theme: Theme.DARK }));
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
          theme={ButtonTheme.CLEAR}
          onClick={onToggleLightHandler}>
          {t('Light')}
        </Button>
        <Button
          className={classNames(cls.item, {}, [])}
          theme={ButtonTheme.CLEAR}
          onClick={onToggleDarkHandler}>
          {t('Dark')}
        </Button>
      </div>
    );
  },
);
