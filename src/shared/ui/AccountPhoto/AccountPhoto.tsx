import { memo, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import AccountPlaceholderIcon from '@/shared/assets/icons/account-pic-placeholder.svg';
import cls from './AccountPhoto.module.scss';

interface AccountPhotoProps {
  className?: string;
  src?: string;
  alt?: string;
}

export const AccountPhoto = memo(
  ({ className, alt, src }: AccountPhotoProps) => {
    const [loading, setLoading] = useState(true);

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
      if (src) {
        const img = document.createElement('img');
        img.src = src;
        img.onload = () => {
          setIsValid(true);
          setLoading(false);
        };
        img.onerror = () => {
          setIsValid(false);
          setLoading(false);
        };
      } else {
        setLoading(false);
      }
    }, [src]);

    if (!src || (!loading && !isValid)) {
      return (
        <AccountPlaceholderIcon
          className={classNames(cls.AccountPhoto, {}, [className])}
        />
      );
    }

    return (
      <img
        src={src}
        className={classNames(cls.AccountPhoto, {}, [className])}
        alt={alt}
      />
    );
  },
);
