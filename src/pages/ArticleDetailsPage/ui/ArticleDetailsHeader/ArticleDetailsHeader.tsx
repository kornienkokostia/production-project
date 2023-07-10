import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsHeader.module.scss';
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
} from 'entities/Article/model/selectors/articleDetails';
import {
  RoutePath,
  locationState,
} from 'shared/config/routeConfig/routeConfig';

interface ArticleDetailsHeaderProps {
  className?: string;
}

export const ArticleDetailsHeader = ({
  className,
}: ArticleDetailsHeaderProps) => {
  const navbarCollapsed = useSelector(getNavbarCollapsed);
  const navigate = useNavigate();
  const { t } = useTranslation('article-details');
  const article = useSelector(getArticleDetailsData);
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const location = useLocation() as locationState;

  const onBackToList = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div
      className={classNames(
        cls.ArticleHeader,
        { [cls.navbarCollapsed]: navbarCollapsed },
        [],
      )}
    >
      <Button
        theme={ButtonTheme.APPLE_CLEAR}
        className={cls.backBtn}
        onClick={onBackToList}
      >
        <ArrowBackIcon className={cls.btnIcon} />
        {location.state.prevPath === RoutePath.articles ? (
          <span>{t('Articles')}</span>
        ) : (
          <span>{t('Back')}</span>
        )}
      </Button>
      {article && !isLoading && (
        <>
          <p className={cls.date}>{article?.createdAt}</p>
          <p className={cls.views}>{`${article?.views} ${t('views')}`}</p>
        </>
      )}
    </div>
  );
};
