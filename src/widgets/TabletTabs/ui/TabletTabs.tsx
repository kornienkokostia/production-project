import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TabletTabs.module.scss';

interface TabletTabsProps {
  className?: string;
}

export const TabletTabs = ({ className }: TabletTabsProps) => {
  return <div className={classNames(cls.Tablettabs, {}, [className])}></div>;
};
