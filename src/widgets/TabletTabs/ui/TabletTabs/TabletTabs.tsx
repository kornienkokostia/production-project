import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './TabletTabs.module.scss';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '@/widgets/Sidebar/model/selector/getSidebarItems';
import { TabletTabsItem } from '../TabletTabsItem/TabletTabsItem';

interface TabletTabsProps {
  className?: string;
}

export const TabletTabs = ({ className }: TabletTabsProps) => {
  const sidebarItemsList = useSelector(getSidebarItems);

  return (
    <div className={classNames(cls.Tablettabs, {}, [className])}>
      {sidebarItemsList.map((el, i) => (
        <TabletTabsItem
          item={el}
          hasDivider={i < sidebarItemsList.length - 1}
        />
      ))}
    </div>
  );
};
