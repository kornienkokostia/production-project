import { memo, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '../../assets/icons/star.svg';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
  const { className, onSelect, selectedStars = 0 } = props;

  const [currentStarCount, setCurrentStarCount] = useState(0);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  useEffect(() => {
    setCurrentStarCount(selectedStars);
  }, [selectedStars]);

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {stars.map(el => (
        <StarIcon
          className={classNames(
            cls.star,
            {
              [cls.hovered]: currentStarCount >= el,
              [cls.selected]: isSelected,
            },
            [],
          )}
          onMouseEnter={onHover(el)}
          onMouseLeave={onLeave}
          onClick={onClick(el)}
          key={el}
        />
      ))}
    </div>
  );
});
