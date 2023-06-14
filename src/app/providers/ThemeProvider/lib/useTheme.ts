import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
  toggleLightTheme: () => void;
  toggleDarkTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleLightTheme = () => {
    if (theme !== Theme.LIGHT) {
      setTheme(Theme.LIGHT);
      document.body.className = Theme.LIGHT
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.LIGHT);
    }
  };
  const toggleDarkTheme = () => {
    if (theme !== Theme.DARK) {
      setTheme(Theme.DARK);
      document.body.className = Theme.DARK
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.DARK);
    }
  };

  return {
    theme,
    toggleLightTheme,
    toggleDarkTheme
  };
}
