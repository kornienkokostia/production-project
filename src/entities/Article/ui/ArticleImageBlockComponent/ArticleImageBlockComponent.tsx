import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  ({ className, block }: ArticleImageBlockComponentProps) => (
    <div
      className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
    >
      <img src={block.src} alt={block.title} className={cls.img} />
      {block.title && <p className={cls.imgTitle}>{block.title}</p>}
    </div>
  ),
);
