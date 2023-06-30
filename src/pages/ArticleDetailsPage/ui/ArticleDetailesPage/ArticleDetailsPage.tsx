import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailesPageProps {
  className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailesPageProps) => {
  const { t } = useTranslation('article-details');
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
        {t('Article is not found')}
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleDetailesPage, {}, [className])}>
      <ArticleDetails id={id} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
