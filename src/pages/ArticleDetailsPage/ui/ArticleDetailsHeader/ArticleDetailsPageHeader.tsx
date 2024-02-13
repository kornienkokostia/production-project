import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getNavbarCollapsed } from '@/entities/AppState';
import { Button } from '@/shared/ui/Button';
import ArrowBackIcon from '@/shared/assets/icons/arrow-back.svg';
import {
  getArticleDetailsData,
  getArticleDetailsIsLoading,
} from '@/entities/Article';
import cls from './ArticleDetailsPageHeader.module.scss';
import { getRouteArticles } from '@/shared/const/router';
import { locationState } from '@/shared/types/router';
import { formatNumber } from '@/shared/lib/helpers/helpers';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = ({
  className,
}: ArticleDetailsPageHeaderProps) => {
  const navbarCollapsed = useSelector(getNavbarCollapsed);
  const navigate = useNavigate();
  const { t } = useTranslation('article-details');
  const article = useSelector(getArticleDetailsData);
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const location = useLocation() as locationState;
  // const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    if (!location.state) {
      navigate(getRouteArticles());
    } else {
      navigate(-1);
    }
  }, [navigate, location.state]);

  // const onEditArticle = useCallback(() => {
  //   navigate(`${RoutePath.articles}/${article?.id}/edit`);
  // }, [navigate, article?.id]);

  return (
    <div
      className={classNames(
        cls.ArticleHeader,
        { [cls.navbarCollapsed]: navbarCollapsed },
        [className],
      )}>
      <Button
        theme="apple-clear"
        className={cls.backBtn}
        onClick={onBackToList}>
        <ArrowBackIcon className={cls.btnIcon} />
        {!location.state || location.state.prevPath === getRouteArticles() ? (
          <span>{t('Articles')}</span>
        ) : (
          <span>{t('Back')}</span>
        )}
      </Button>
      {article && !isLoading && (
        <>
          <p className={cls.date}>{article?.createdAt}</p>
          <p className={cls.views}>{`${formatNumber(article?.views)} ${t(
            'views',
          )}`}</p>
          {/* <div className={cls.editWrapper}>
            {canEdit && (
              <Button
                theme={ButtonTheme.APPLE_CLEAR}
                className={cls.editBtn}
                onClick={onEditArticle}
              >
                {t('Edit')}
              </Button>
            )}
          </div> */}
        </>
      )}
    </div>
  );
};
