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
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  value?: string;
  onChange?: (value: string) => void;
  theme?: InputTheme;
  hidden?: boolean;
  paddingRight?: boolean;
}

export const TextInput = memo((props: PassedProps) => {
  const {
    fieldTitle,
    isFocused,
    setIsFocused,
    type = 'text',
    value,
    onChange,
    theme,
    hidden,
    paddingRight,
    ...otherProps
  } = props;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.currentTarget.value.length === 0 ? setIsFocused(!isFocused) : false;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames('input-field', {}, [theme])}>
      <input
        className={classNames(
          'input-field-input',
          { hidden, paddingRight },
          [],
        )}
        value={value}
        type={type}
        onFocus={handleFocus}
        onBlur={handleFocus}
        onChange={e => {
          onChangeHandler(e);
        }}
        {...otherProps}
      />
      <span
        className={classNames('input-field-title', { hiddenTitle: hidden }, [
          isFocused ? 'active' : undefined,
        ])}
      >
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
