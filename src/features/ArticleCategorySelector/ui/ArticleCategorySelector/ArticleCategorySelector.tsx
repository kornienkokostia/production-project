import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleType } from '@/entities/Article';
import { Select, SelectOption } from '@/shared/ui/Select';

interface ArticleCategorySelectorProps {
  value: ArticleType;
  onChange: (type: ArticleType) => void;
  sidebarPadding: boolean;
  withoutAll: boolean;
}

export const ArticleCategorySelector = (
  props: ArticleCategorySelectorProps,
) => {
  const { t } = useTranslation('articles');
  const { value, onChange, sidebarPadding, withoutAll } = props;
  const categoryOptions = useMemo<SelectOption<ArticleType>[]>(() => {
    const arr = (Object.keys(ArticleType) as ArticleType[]).map(el => {
      return { value: el, content: `${t(el)}` };
    });
    if (withoutAll) {
      arr.shift();
    }
    return arr;
  }, [t, withoutAll]);

  return (
    <Select
      submenuTheme="category"
      title={t('Category')}
      options={categoryOptions}
      value={value}
      onChange={onChange}
      sidebarPadding={sidebarPadding}
    />
  );
};
