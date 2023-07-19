import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/Code';
import cls from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
  ({ className, block }: ArticleCodeBlockComponentProps) => (
    <div className={classNames(cls.ArticleCodeBlockWrapper, {}, [className])}>
      <div className={cls.ArticleCodeBlockComponent}>
        <Code>{block.code}</Code>
      </div>
    </div>
  ),
);
