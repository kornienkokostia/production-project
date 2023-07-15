import { classNames } from 'shared/lib/classNames/classNames';
import ListIcon from 'shared/assets/icons/view-list.svg';
import GridIcon from 'shared/assets/icons/view-grid.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { ArticleView } from 'entities/Article/model/consts/articleConsts';
import cls from './ArticleViewSwitcher.module.scss';

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
    if (newView !== view) {
      onViewClick(newView);
    }
  };

  return (
    <div className={classNames(cls.ArticleViewSwitcher, {}, [className])}>
      {viewTypes.map(el => (
        <Button
          theme={ButtonTheme.CLEAR}
          onClick={onClick(el.view)}
          className={classNames(
            cls.viewBtn,
            { [cls.selected]: el.view !== view },
            [],
          )}
          key={el.view}>
          <el.Icon className={cls.viewBtnIcon} />
        </Button>
      ))}
    </div>
  );
};
