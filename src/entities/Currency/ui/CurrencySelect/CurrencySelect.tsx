import { useTranslation } from 'react-i18next';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Currancy } from '../../model/types/currency';
import { memo, useCallback } from 'react';

interface CurrencySelectProps {
  value?: Currancy;
  onChange?: (val: Currancy) => void;
  readonly?: boolean;
}

const options = [
  { value: Currancy.USD, content: Currancy.USD },
  { value: Currancy.EUR, content: Currancy.EUR },
  { value: Currancy.RUB, content: Currancy.RUB },
];

export const CurrencySelect = memo(
  ({ value, onChange, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation('account');

    const onChangeHandler = useCallback((val: string) => {
      onChange?.(val as Currancy);
    }, []);

    return (
      <Dropdown
        fieldTitle={t('Currency')}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    );
  },
);
