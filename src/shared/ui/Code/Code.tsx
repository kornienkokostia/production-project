import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  children: ReactNode;
}

export const Code = ({ className, children }: CodeProps) => (
  <pre className={classNames(cls.CodeWrapper, {}, [className])}>
    <code className={cls.Code}>{children}</code>
  </pre>
);
