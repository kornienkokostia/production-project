import { Link, LinkProps } from 'react-router-dom';
import { ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkTheme = 'clear' | 'apple-link';

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to, children, className, theme = 'clear', ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
});
