import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Theme } from '@/shared/const/theme';
import { useJsonSettings } from '@/entities/User';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme: defaultTheme } = useJsonSettings();
  const [isThemeInited, setIsThemeInited] = useState(false);
  const [theme, setTheme] = useState<Theme>(defaultTheme || Theme.LIGHT);

  useEffect(() => {
    if (!isThemeInited && defaultTheme) {
      setTheme(defaultTheme);
      setIsThemeInited(true);
    }
  }, [defaultTheme, isThemeInited]);

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
