import { ArticleType } from '@/entities/Article';
import { ArticleBlock } from '@/entities/Article/model/types/article';

export interface ArticleEditSchema {
  title: string,
  subtitle: string,
  img: string,
  type: ArticleType[],
  blocks: ArticleBlock[],
}
