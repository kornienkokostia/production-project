import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tablettabs.module.scss';

interface TablettabsProps {
  className?: string;
}

export const Tablettabs = ({ className }: TablettabsProps) => {
  return <div className={classNames(cls.Tablettabs, {}, [className])}></div>;
};
