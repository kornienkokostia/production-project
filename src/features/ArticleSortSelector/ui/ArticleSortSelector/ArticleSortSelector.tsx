import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption } from '@/shared/ui/Select';
import { ArticleSortField } from '@/entities/Article';
import { SortOrder } from '@/shared/types';

interface ArticleSortSelectorProps {
  value: ArticleSortField;
  order: SortOrder;
  onChange: (sort: ArticleSortField) => void;
  onChangeOrder: (order: SortOrder) => void;
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
  const { t } = useTranslation('articles');
  const {
    value, order, onChange, onChangeOrder,
  } = props;

  const sortFiledOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      { value: ArticleSortField.CREATED, content: `${t('Date')}` },
      { value: ArticleSortField.TITLE, content: `${t('Name')}` },
      { value: ArticleSortField.VIEWS, content: `${t('Views')}` },
    ],
    [t],
  );

  return (
    <Select
      submenuTheme="sort-by"
      title={t('Sort by')}
      options={sortFiledOptions}
      value={value}
      order={order}
      onChange={onChange}
      onChangeOrder={onChangeOrder}
    />
  );
};
