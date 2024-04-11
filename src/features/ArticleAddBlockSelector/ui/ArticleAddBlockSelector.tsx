import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption } from '@/shared/ui/Select';
import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { ArticleBlock } from '@/entities/Article/model/types/article';
import { ArticleBlockType } from '@/entities/Article/model/consts/articleConsts';

interface ArticleAddBlockSelectorProps {
  value: ArticleBlockType;
  onChange: (sort: ArticleBlockType) => void;
}

export const ArticleAddBlockSelector = (
  props: ArticleAddBlockSelectorProps,
) => {
  const { t } = useTranslation('article-edit');
  const { value, onChange } = props;

  const sortFiledOptions = useMemo<SelectOption<ArticleBlockType>[]>(
    () => [
      { value: ArticleBlockType.TEXT, content: `${t('Text')}` },
      { value: ArticleBlockType.IMAGE, content: `${t('Image')}` },
      { value: ArticleBlockType.CODE, content: `${t('Code')}` },
    ],
    [t],
  );

  return (
    <Select
      submenuTheme="sort-by"
      title={t('Add Block')}
      options={sortFiledOptions}
      value={value}
      onChange={onChange}
      showSelected={false}
    />
  );
};
