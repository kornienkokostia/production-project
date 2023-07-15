import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Dispatch, SetStateAction } from 'react';
import cls from './AccountPopupItem.module.scss';
import { AccountPopupElem } from '../model/types/accountPopup';

interface AccountPopupItemProps {
  className?: string;
  item: AccountPopupElem;
  selected: string;
  showSelected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}

export const AccountPopupItem = (props: AccountPopupItemProps) => {
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
      >
        <item.Icon className={cls.icon} />
        <p>{item.title}</p>
      </Button>
      {item.hasDivider && <div className={cls.divider} />}
    </>
  );
};
