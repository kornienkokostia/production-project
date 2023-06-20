import { lazy } from 'react';

export const AboutPageAsync = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('./AboutPage'),
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ]);
  return moduleExports;
});
