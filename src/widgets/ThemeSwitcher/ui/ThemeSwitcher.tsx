import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleLightTheme, toggleDarkTheme } = useTheme();
  const { t } = useTranslation();

  return (
    // <Button
    //   theme={ButtonTheme.CLEAR}
    //   className={classNames(cls.ThemeSwitcher, {}, [className])}
    //   onClick={toggleTheme}
    // >
    //   {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    // </Button>
    <div className={classNames(cls.ThemeSwitcher, {}, [className])}>
      <Button
        className={classNames(cls.item, {}, [
          theme === Theme.LIGHT ? cls.active : undefined,
        ])}
        theme={ButtonTheme.CLEAR}
        onClick={toggleLightTheme}
      >
        {t('Light')}
      </Button>
      <Button
        className={classNames(cls.item, {}, [
          theme === Theme.DARK ? cls.active : undefined,
        ])}
        theme={ButtonTheme.CLEAR}
        onClick={toggleDarkTheme}
      >
        {t('Dark')}
      </Button>
    </div>
  );
};
