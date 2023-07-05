import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const ArticleList = (props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleView.SMALL } = props;

  const renderArticle = (article: Article) => (
    <ArticleListItem article={article} view={view} key={article.id} />
  );

  return (
    <div className={classNames(cls.ArticleListWrapper, {}, [className])}>
      <div className={classNames(cls.ArticleList, {}, [cls[view]])}>
        {articles.length > 0 ? articles.map(renderArticle) : null}
      </div>
    </div>
  );
};
