import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleType } from '../../model/consts/articleConsts';
import { Select, SelectOption } from '@/shared/ui/Select/Select';
import { SubmenuTheme } from '@/shared/ui/Submenu/Submenu';

interface ArticleCategorySelectorProps {
  value: ArticleType;
  onChange: (type: ArticleType) => void;
  sidebarPadding: boolean;
}

export const ArticleCategorySelector = (
  props: ArticleCategorySelectorProps,
) => {
  const { t } = useTranslation('articles');
  const { value, onChange, sidebarPadding } = props;

  const categoryOptions = useMemo<SelectOption<ArticleType>[]>(
    () => [
      { value: ArticleType.ALL, content: `${t('All')}` },
      { value: ArticleType.ECONOMICS, content: `${t('Economics')}` },
      { value: ArticleType.IT, content: `${t('IT')}` },
      { value: ArticleType.SCIENCE, content: `${t('Science')}` },
    ],
    [t],
  );

  return (
    <Select
      submenuTheme={SubmenuTheme.CATEGORY}
      title={t('Category')}
      options={categoryOptions}
      value={value}
      onChange={onChange}
      sidebarPadding={sidebarPadding}
    />
  );
};
