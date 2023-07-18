import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RatingCard } from '@/entities/Rating';
import cls from './ArticleRating.module.scss';
import { useArticleRating, useRateArticle } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';

interface ArticleRatingProps {
  articleId: string;
}

export const ArticleRating = (props: ArticleRatingProps) => {
  const { articleId } = props;
  const { t } = useTranslation('article-details');
  const userData = useSelector(getUserAuthData);
  const { data } = useArticleRating({ articleId, userId: userData?.id ?? '' });
  const [rateArticleMutation] = useRateArticle();

  const rating = data?.[0];

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? '',
          articleId,
          rate: starsCount,
          feedback,
        });
      } catch (e) {
        console.log(e);
      }
    },
    [articleId, rateArticleMutation, userData?.id],
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle],
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle],
  );

  return (
    <RatingCard
      rate={rating?.rate}
      title={t('Rate this article')}
      feedbackTitle={t('Leave a feedback')}
      paleholder={t('Enter your feedback')}
      onCancel={onCancel}
      onAccept={onAccept}
      hasFeedback
      className={cls.ArticleRating}
    />
  );
};
