import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC, ReactNode, memo } from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  APPLE = 'apple',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const { className, children, theme, ...otherProps } = props;

  return (
    <button
      className={classNames(cls.Button, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
});
