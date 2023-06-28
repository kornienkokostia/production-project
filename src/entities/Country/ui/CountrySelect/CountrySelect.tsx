import { useTranslation } from 'react-i18next';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Country } from '../../model/types/country';
import { memo, useCallback } from 'react';

interface CountrySelectProps {
  value?: Country;
  onChange?: (val: Country) => void;
  readonly?: boolean;
}

const options = Object.values(Country)
  .filter(v => isNaN(Number(v)))
  .map(el => ({ value: el, content: el }));

export const CountrySelect = memo(
  ({ value, onChange, readonly }: CountrySelectProps) => {
    const { t } = useTranslation('account');

    const onChangeHandler = useCallback((val: string) => {
      onChange?.(val as Country);
    }, []);

    return (
      <Dropdown
        fieldTitle={t('Country')}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    );
  },
);
