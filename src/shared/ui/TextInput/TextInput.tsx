import React, { InputHTMLAttributes, memo, useState } from 'react';
import './TextInput.scss';
import { classNames } from 'shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

export enum InputTheme {
  WITHOUT_BOTTOM_CORNERS = 'without-bottom-corners',
  WITHOUT_TOP_CORNERS = 'without-top-corners',
}

interface PassedProps extends HTMLInputProps {
  fieldTitle: string;
  value?: string;
  onChange?: (value: string) => void;
  theme?: InputTheme;
}

export const TextInput = memo((props: PassedProps) => {
  const {
    fieldTitle,
    type = 'text',
    value,
    onChange,
    theme,
    ...otherProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.currentTarget.value.length === 0 ? setIsFocused(prev => !prev) : false;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames('input-field', {}, [theme])}>
      <input
        className={`input-field-input`}
        value={value}
        type={type}
        onFocus={handleFocus}
        onBlur={handleFocus}
        onInput={() => {
          setIsFocused(true);
          onChangeHandler;
        }}
      />
      <span className={`input-field-title ${isFocused ? 'active' : ''} `}>
        {fieldTitle}
      </span>

      {/* <div
        className={`input-field-error ${errors !== undefined ? 'active' : ''}`}
      >
        <img
          className="input-field-error-img"
          src="https://kornienkokostia.github.io/online-store/assets/images/icons/error.svg"
          alt="error"
        ></img>
        <span className="input-field-error-msg">
          {errors !== undefined ? errors.message : ''}
        </span>
      </div> */}
    </div>
  );
});
