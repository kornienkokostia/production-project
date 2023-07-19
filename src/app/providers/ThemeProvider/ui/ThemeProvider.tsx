import React, { ReactNode, useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Theme } from '@/shared/const/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
