import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AccountPhoto.module.scss';
import AccountPlaceholderIcon from 'shared/assets/icons/account-pic-placeholder.svg';
import { memo, useEffect, useState } from 'react';

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
      fetch(new URL(src || '')).then(res => {
        setIsValid(res.status === 200);
        setLoading(false);
      });
    }, [src]);

    if (!loading && !isValid) {
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
      ></img>
    );
  },
);
