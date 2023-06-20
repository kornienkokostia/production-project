import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

export enum LoaderTheme {
  BIG = 'big',
  SMALL = 'small',
}

interface ButtonProps {
  theme?: LoaderTheme;
}

export const Loader = ({ theme }: ButtonProps) => (
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
