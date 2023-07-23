import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TabletTabs.module.scss';
import { getSidebarItems } from '@/shared/lib/sidebar/selector/getSidebarItems';
import { TabletTabsItem } from '../TabletTabsItem/TabletTabsItem';
import { memo } from 'react';

interface TabletTabsProps {
  className?: string;
}

export const TabletTabs = memo(({ className }: TabletTabsProps) => {
  const sidebarItemsList = useSelector(getSidebarItems);

  return (
    <div className={classNames(cls.TabletTabs, {}, [className])}>
      {sidebarItemsList.map((el, i) => (
        <TabletTabsItem
          item={el}
          hasDivider={i < sidebarItemsList.length - 1}
          key={`tab number ${i}`}
        />
      ))}
    </div>
  );
});
