import { classNames } from 'shared/lib/classNames/classNames';
import './Dropdown.scss';
import DropdownIcon from 'shared/assets/icons/dropdown-icon.svg';
import { ChangeEvent, memo, useMemo } from 'react';

interface SelectOption {
  value: string;
  content: string;
}

interface DropdownProps {
  fieldTitle: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (val: string) => void;
  readonly?: boolean;
}

export const Dropdown = memo((props: DropdownProps) => {
  const { fieldTitle, options, value, onChange, readonly } = props;

  const optionList = useMemo(() => {
    return options?.map(el => (
      <option value={el.value} key={el.value}>
        {el.content}
      </option>
    ));
  }, [options]);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="input-field dropdown-input">
      <select
        className="input-field-input"
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionList}
      </select>
      <span className={classNames('input-field-title', {}, ['active'])}>
        {fieldTitle}
      </span>
      <DropdownIcon className="dropdown-input-icon" />
    </div>
  );
});
