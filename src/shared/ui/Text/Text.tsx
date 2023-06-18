import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
}

export const Text = ({ className, title, text }: TextProps) => {
  return (
    <div className={classNames(cls.Text, {}, [className])}>
      {title && <p className={cls.title}></p>}
      {text && <p className={cls.text}></p>}
    </div>
  );
};
