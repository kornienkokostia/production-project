import { Dispatch, SetStateAction } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import cls from './AccountMenuItem.module.scss';
import { AccountMenuElem } from '../model/types/accountMenu';

interface AccountMenuItemProps {
  className?: string;
  item: AccountMenuElem;
  selected: string;
  showSelected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}

export const AccountMenuItem = (props: AccountMenuItemProps) => {
  const {
    item, selected, showSelected, setSelected,
  } = props;
  return (
    <>
      <Button
        className={classNames(
          cls.item,
          {
            [cls.selected]: selected === item.title && showSelected,
            [cls.showSelected]: showSelected,
          },
          [],
        )}
        theme={ButtonTheme.CLEAR}
        onClick={item.onClick}
        onMouseEnter={() => {
          setSelected(item.title);
        }}
        onMouseLeave={() => setSelected('')}
      >
        <item.Icon className={cls.icon} />
        <p>{item.title}</p>
      </Button>
      {item.hasDivider && <div className={cls.divider} />}
    </>
  );
};
