import { lazy } from 'react';

export const ArticlesPageAsync = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('./ArticlesPage'),
    new Promise(resolve => setTimeout(resolve, 1500)),
  ]);
  return moduleExports;
});
