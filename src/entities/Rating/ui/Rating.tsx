import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Rating.module.scss';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Submenu } from '@/shared/ui/Submenu/Submenu';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';

interface RatingCardProps {
  className?: string;
  title?: string;
  paleholder?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
    paleholder,
    rate = 0,
  } = props;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startsCount, setsStartsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setsStartsCount(rate);
  }, [rate]);

  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setsStartsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(startsCount, feedback);
  }, [feedback, onAccept, startsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(startsCount);
  }, [onCancel, startsCount]);

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
    cancelHandle();
  }, [cancelHandle]);

  const onTextChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.scrollTo(0, el.scrollHeight);
    setFeedback(el.value);
  }, []);

  return (
    <div className={classNames(cls.Rating, {}, [className])}>
      <h2 className={cls.title}>{title}</h2>
      <StarRating
        onSelect={onSelectStars}
        selectedStars={startsCount}
        className={cls.starRating}
      />
      <Modal isOpen={isModalOpen} onClose={onCloseModal} lazy>
        <div className={cls.modalFeedback}>
          <h2 className={cls.modalTitle}>{feedbackTitle}</h2>
          <div
            className={classNames(
              cls.modalMsgWrapper,
              { [cls.isFocused]: isFocused },
              [],
            )}>
            <textarea
              placeholder={paleholder}
              className={cls.modalMsg}
              onChange={onTextChange}
              onFocus={() => setIsFocused(prev => !prev)}
              onBlur={() => setIsFocused(prev => !prev)}
            />
          </div>
          <Button
            theme={ButtonTheme.APPLE_CLEAR}
            className={cls.sendBtn}
            onClick={acceptHandle}>
            {t('Submit')}
          </Button>
        </div>
      </Modal>
    </div>
  );
});
