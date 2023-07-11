import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getNavbarCollapsed } from 'entities/AppState';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import ArrowBackIcon from 'shared/assets/icons/arrow-back.svg';
import { useTranslation } from 'react-i18next';
import {
  getArticleDetailsData,
  getArticleDetailsIsLoading,
} from 'entities/Article';
import {
  RoutePath,
  locationState,
} from 'shared/config/routeConfig/routeConfig';
import { getCanEditArticle } from '../../model/selectors/article';
import cls from './ArticleDetailsPageHeader.module.scss';

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
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    if (!location.state) {
      navigate(RoutePath.articles);
    } else {
      navigate(-1);
    }
  }, [navigate, location.state]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.articles}/${article?.id}/edit`);
  }, [navigate, article?.id]);

  return (
    <div
      className={classNames(
        cls.ArticleHeader,
        { [cls.navbarCollapsed]: navbarCollapsed },
        [className],
      )}
    >
      <Button
        theme={ButtonTheme.APPLE_CLEAR}
        className={cls.backBtn}
        onClick={onBackToList}
      >
        <ArrowBackIcon className={cls.btnIcon} />
        {!location.state || location.state.prevPath === RoutePath.articles ? (
          <span>{t('Articles')}</span>
        ) : (
          <span>{t('Back')}</span>
        )}
      </Button>
      {article && !isLoading && (
        <>
          <p className={cls.date}>{article?.createdAt}</p>
          <p className={cls.views}>{`${article?.views} ${t('views')}`}</p>
          <div className={cls.editWrapper}>
            {/* {canEdit && (
              <Button
                theme={ButtonTheme.APPLE_CLEAR}
                className={cls.editBtn}
                onClick={onEditArticle}
              >
                {t('Edit')}
              </Button>
            )} */}
          </div>
        </>
      )}
    </div>
  );
};
