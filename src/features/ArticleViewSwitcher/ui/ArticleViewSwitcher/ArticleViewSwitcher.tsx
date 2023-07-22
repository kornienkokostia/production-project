import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/view-list.svg';
import GridIcon from '@/shared/assets/icons/view-grid.svg';
import { Button } from '@/shared/ui/Button';
import cls from './ArticleViewSwitcher.module.scss';
import { ArticleView } from '@/entities/Article';

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
          theme="clear"
          onClick={onClick(el.view)}
          className={classNames(
            cls.viewBtn,
            { [cls.selected]: el.view === view },
            [],
          )}
          key={el.view}
        >
          <el.Icon className={cls.viewBtnIcon} />
        </Button>
      ))}
    </div>
  );
};
