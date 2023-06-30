import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('./ArticleDetailsPage'),
    new Promise(resolve => setTimeout(resolve, 1500)),
  ]);
  return moduleExports;
});
