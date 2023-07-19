import { memo, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarOutlineIcon from '../../assets/icons/star-outline.svg';
import StarFillIcon from '../../assets/icons/star-fill.svg';

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
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setCurrentStarCount(selectedStars);
    setIsSelected(Boolean(selectedStars));
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
      {stars.map(el =>
        currentStarCount >= el || isSelected ? (
          <StarFillIcon
            className={classNames(cls.star, { [cls.selected]: isSelected }, [])}
            onMouseEnter={onHover(el)}
            onMouseLeave={onLeave}
            onClick={onClick(el)}
            key={el}
          />
        ) : (
          <StarOutlineIcon
            className={classNames(cls.star, {}, [])}
            onMouseEnter={onHover(el)}
            onMouseLeave={onLeave}
            onClick={onClick(el)}
            key={el}
          />
        ),
      )}
    </div>
  );
});
