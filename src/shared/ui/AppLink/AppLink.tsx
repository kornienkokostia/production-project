import { Link, LinkProps } from 'react-router-dom';
import { ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
  NO_STYLE = 'no-style',
  APPLE_LINK = 'apple-link',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to,
    children,
    className,
    theme = AppLinkTheme.NO_STYLE,
    ...otherProps
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
