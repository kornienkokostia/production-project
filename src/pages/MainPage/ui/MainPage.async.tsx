import { lazy } from 'react';

export const MainPageAsync = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('./MainPage'),
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ]);
  return moduleExports;
});
