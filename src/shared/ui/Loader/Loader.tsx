import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

export const Loader = () => (
  <div className={cls.Spinner}>
    <div className={cls.SpinnerBlade} />
    <div className={cls.SpinnerBlade} />
    <div className={cls.SpinnerBlade} />
    <div className={cls.SpinnerBlade} />
    <div className={cls.SpinnerBlade} />
    <div className={cls.SpinnerBlade} />
    <div className={cls.SpinnerBlade} />
    <div className={cls.SpinnerBlade} />
  </div>
);
