import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AccountPhoto.module.scss';
import AccountPlaceholderIcon from 'shared/assets/icons/account-pic-placeholder.svg';

interface AccountPhotoProps {
  className?: string;
  src?: string;
  alt?: string;
}

export const AccountPhoto = ({ className, src, alt }: AccountPhotoProps) => {
  return (
    <>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={classNames(cls.AccountPhoto, {}, [className])}
        ></img>
      ) : (
        <AccountPlaceholderIcon
          className={classNames(cls.AccountPhoto, {}, [className])}
        />
      )}
    </>
  );
};
