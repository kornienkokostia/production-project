import { lazy } from 'react';

export const ArticleEditPageAsync = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('./ArticleEditPage'),
    new Promise(resolve => setTimeout(resolve, 1500)),
  ]);
  return moduleExports;
});
