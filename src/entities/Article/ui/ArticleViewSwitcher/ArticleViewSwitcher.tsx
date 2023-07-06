import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleViewSwitcher.module.scss';
import { ArticleView } from '../../model/types/article';
import ListIcon from 'shared/assets/icons/view-list.svg';
import GridIcon from 'shared/assets/icons/view-grid.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface ArticleViewSwitcherProps {
  className?: string;
  view: ArticleView;
  onViewClick: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    Icon: GridIcon,
  },
  {
    view: ArticleView.BIG,
    Icon: ListIcon,
  },
];

export const ArticleViewSwitcher = ({
  className,
  view,
  onViewClick,
}: ArticleViewSwitcherProps) => {
  const onClick = (newView: ArticleView) => () => {
    onViewClick(newView);
  };

  return (
    <div className={classNames(cls.ArticleViewSwitcher, {}, [className])}>
      {viewTypes.map((el, i) => (
        <Button
          theme={ButtonTheme.CLEAR}
          onClick={onClick(el.view)}
          className={classNames(
            cls.viewBtn,
            { [cls.selected]: el.view !== view },
            [],
          )}
          key={i}
        >
          <el.Icon className={cls.viewBtnIcon}></el.Icon>
        </Button>
      ))}
    </div>
  );
};
