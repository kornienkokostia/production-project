import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={cls.Spinner}>
      <div className={cls.SpinnerBlade}></div>
      <div className={cls.SpinnerBlade}></div>
      <div className={cls.SpinnerBlade}></div>
      <div className={cls.SpinnerBlade}></div>
      <div className={cls.SpinnerBlade}></div>
      <div className={cls.SpinnerBlade}></div>
      <div className={cls.SpinnerBlade}></div>
      <div className={cls.SpinnerBlade}></div>
    </div>
  );
};
