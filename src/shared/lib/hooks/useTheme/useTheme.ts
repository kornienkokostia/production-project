import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '../../../const/localStorage';
import { Theme } from '../../../const/theme';

interface UseThemeResult {
  toggleLightTheme: () => void;
  toggleDarkTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleLightTheme = () => {
    if (theme !== Theme.LIGHT) {
      setTheme?.(Theme.LIGHT);
      document.body.className = Theme.LIGHT;
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.LIGHT);
    }
  };
  const toggleDarkTheme = () => {
    if (theme !== Theme.DARK) {
      setTheme?.(Theme.DARK);
      document.body.className = Theme.DARK;
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.DARK);
    }
  };

  return {
    theme: theme || Theme.DARK,
    toggleLightTheme,
    toggleDarkTheme,
  };
}
