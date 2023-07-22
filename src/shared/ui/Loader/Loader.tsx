import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

export type LoaderTheme = 'big' | 'small';

interface LoaderProps {
  theme?: LoaderTheme;
}

export const Loader = ({ theme = 'big' }: LoaderProps) => (
  <div className={classNames(cls.spinner, {}, ['center', cls[theme]])}>
    <div className={cls.spinnerBlade} />
    <div className={cls.spinnerBlade} />
    <div className={cls.spinnerBlade} />
    <div className={cls.spinnerBlade} />
    <div className={cls.spinnerBlade} />
    <div className={cls.spinnerBlade} />
    <div className={cls.spinnerBlade} />
    <div className={cls.spinnerBlade} />
    <div className={cls.spinnerBlade} />
    <div className={cls.spinnerBlade} />
    <div className={cls.spinnerBlade} />
    <div className={cls.spinnerBlade} />
  </div>
);
