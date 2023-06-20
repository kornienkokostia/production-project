import { lazy } from 'react';

export const AccountPageAsync = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('./AccountPage'),
    new Promise(resolve => setTimeout(resolve, 1500)),
  ]);
  return moduleExports;
});
