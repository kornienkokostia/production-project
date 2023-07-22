import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Theme } from '../../../const/theme';

interface UseThemeResult {
  toggleLightTheme: (saveAction?: (theme: Theme) => void) => void;
  toggleDarkTheme: (saveAction?: (theme: Theme) => void) => void;
  theme: Theme;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleLightTheme = (saveAction?: (theme: Theme) => void) => {
    if (theme !== Theme.LIGHT) {
      setTheme?.(Theme.LIGHT);
      saveAction?.(Theme.LIGHT);
    }
  };
  const toggleDarkTheme = (saveAction?: (theme: Theme) => void) => {
    if (theme !== Theme.DARK) {
      setTheme?.(Theme.DARK);
      saveAction?.(Theme.DARK);
    }
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleLightTheme,
    toggleDarkTheme,
  };
};
