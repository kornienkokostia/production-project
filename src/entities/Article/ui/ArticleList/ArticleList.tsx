import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { ArticleView } from 'entities/Article/model/consts/articleConsts';
import cls from './ArticleList.module.scss';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

export const ArticleList = (props: ArticleListProps) => {
  const {
    className, articles, isLoading, view = ArticleView.SMALL,
  } = props;
  const { t } = useTranslation('articles');

  const renderArticle = (article: Article) => (
    <ArticleListItem article={article} view={view} key={article.id} />
  );

  if ((isLoading && !articles.length) || isLoading === undefined) {
    return (
      <div className={cls.loadingFull}>
        <Loader />
      </div>
    );
  }

  if (!isLoading && !articles.length) {
    return (
      <div className={cls.noItems}>
        <span>{t('No articles were found')}</span>
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleListWrapper, {}, [className])}>
      <div className={classNames(cls.ArticleList, {}, [cls[view]])}>
        {articles.length > 0 ? articles.map(renderArticle) : null}
      </div>
      {isLoading && articles.length && (
        <div className={cls.loading}>
          <Loader />
        </div>
      )}
    </div>
  );
};
