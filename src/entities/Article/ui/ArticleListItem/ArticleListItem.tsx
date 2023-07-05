import { classNames } from 'shared/lib/classNames/classNames';
import { AccountPhoto } from 'shared/ui/AccountPhoto/AccountPhoto';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import ArrowLinkIcon from 'shared/assets/icons/arrow-link.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = (props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const { t } = useTranslation('article-details');
  const navigate = useNavigate();

  const types = <p className={cls.types}>{article.type.join(', ')}</p>;
  const views = (
    <p className={cls.views}>{`${String(article.views)} ${t('views')}`}</p>
  );

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.article_details + article.id);
  }, [navigate, article.id]);

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      block => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <div className={cls.card}>
          <div className={cls.header}>
            <AccountPhoto
              src={article.user.avatar}
              className={cls.accountPic}
            />
            <p className={cls.username}>{article.user.username}</p>
            <p className={cls.date}>{article.createdAt}</p>
          </div>
          <h3 className={cls.title}>{article.title}</h3>
          {types}
          <img src={article.img} className={cls.image} alt={article.img} />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <Button
              theme={ButtonTheme.APPLE_CLEAR}
              className={cls.link}
              onClick={onOpenArticle}
            >
              <span>{t('Read more')}</span>
              <ArrowLinkIcon className={cls.linkIcon} />
            </Button>
            {views}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Button
        className={cls.card}
        theme={ButtonTheme.CLEAR}
        onClick={onOpenArticle}
      >
        <div className={cls.imageWrapper}>
          <img src={article.img} className={cls.image} alt={article.title} />
        </div>
        <h3 className={cls.title}>{article.title}</h3>

        {types}
        <div className={cls.infoWrapper}>
          {views}
          <p className={cls.date}>{`${article.createdAt}`}</p>
        </div>
      </Button>
    </div>
  );
};
