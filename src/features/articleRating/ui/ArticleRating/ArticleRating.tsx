import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import cls from './ArticleRating.module.scss';
import { useArticleRating } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';

interface ArticleRatingProps {
  articleId: string;
}

export const ArticleRating = (props: ArticleRatingProps) => {
  const { articleId } = props;
  const { t } = useTranslation('article-details');
  const userData = useSelector(getUserAuthData);
  const { data } = useArticleRating({ articleId, userId: userData?.id ?? '' });

  const rating = data?.[0];

  return (
    <RatingCard
      rate={rating?.rate}
      title={t('Rate this article')}
      feedbackTitle={t('Leave a feedback')}
      paleholder={t('Enter your feedback')}
      hasFeedback
      className={cls.ArticleRating}
    />
  );
};
