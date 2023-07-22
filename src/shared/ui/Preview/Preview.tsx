import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Preview.module.scss';
import PreviewIcon from '../../assets/icons/preview-logo.svg';

interface PreviewProps {
  className?: string;
  hidden?: boolean;
}

export const Preview = ({ className, hidden }: PreviewProps) => (
  <div
    className={classNames(cls.Preview, { [cls.hidden]: hidden }, [
      className,
    ])}
  >
    <div className={cls.content}>
      <div className={cls.logo}>
        <PreviewIcon />
      </div>
      <h1 className={cls.title}>iBlog</h1>
      <span className={cls.subtitle}>Loading...</span>
    </div>
  </div>
);
