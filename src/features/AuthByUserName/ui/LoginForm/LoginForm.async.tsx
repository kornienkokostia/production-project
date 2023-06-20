import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(async () => {
  const [moduleExports] = await Promise.all([
    import('./LoginForm'),
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ]);
  return moduleExports;
});
