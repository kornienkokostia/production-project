import { classNames } from 'shared/lib/classNames/classNames';
import { AccountPhoto } from 'shared/ui/AccountPhoto/AccountPhoto';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import ArrowLinkIcon from 'shared/assets/icons/arrow-link.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();

  const types = <p className={cls.types}>{article.type.join(', ')}</p>;
  const views = (
    <p className={cls.views}>{`${String(article.views)} ${t('views')}`}</p>
  );

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
            <AppLink
              theme={AppLinkTheme.APPLE_LINK}
              to={RoutePath.article_details + article.id}
              state={{ prevPath: location.pathname }}
              className={cls.link}
            >
              <span>{t('Read more')}</span>
              <ArrowLinkIcon className={cls.linkIcon} />
            </AppLink>
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
      <AppLink
        className={cls.card}
        theme={AppLinkTheme.NO_STYLE}
        to={RoutePath.article_details + article.id}
        state={{ prevPath: location.pathname }}
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
      </AppLink>
    </div>
  );
};
