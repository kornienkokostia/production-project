import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  ({ className, block }: ArticleTextBlockComponentProps) => (
    <div
      className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
    >
      {block.title && <h2 className={cls.title}>{block.title}</h2>}
      {block.paragraphs.map(el => (
        <p className={cls.paragraph} key={el}>
          {el}
        </p>
      ))}
    </div>
  ),
);
