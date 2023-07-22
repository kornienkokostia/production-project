import React, {
  InputHTMLAttributes,
  Ref,
  forwardRef,
  memo,
  useEffect,
  useState,
} from 'react';
import './TextInput.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import ErrorIcon from '@/shared/assets/icons/error.svg';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readonly'
>;

export type InputTheme = 'without-bottom-corners' | 'without-top-corners';

interface PassedProps extends HTMLInputProps {
  fieldTitle: string;
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  value?: string | number;
  onChange?: (value: string) => void;
  theme?: InputTheme;
  hidden?: boolean;
  paddingRight?: boolean;
  readonly?: boolean;
  error?: boolean;
  errorMesssage?: string;
}

export const TextInput = memo(
  forwardRef<HTMLInputElement, PassedProps>(
    (props: PassedProps, ref: Ref<HTMLInputElement>) => {
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
        readonly,
        error,
        errorMesssage,
        ...otherProps
      } = props;

      const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        e.currentTarget.value.length === 0 ? setIsFocused(!isFocused) : false;
      };

      const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
      };

      const [isError, setIsError] = useState(false);

      useEffect(() => {
        if (!error) {
          setIsError(false);
        }
      }, [error]);

      const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        handleFocus(e);
        if (error) {
          setIsError(true);
        }
      };

      return (
        <div className={classNames('input-field', {}, [theme])}>
          <input
            className={classNames(
              'input-field-input',
              { hidden, paddingRight },
              [isError ? 'error' : undefined],
            )}
            value={value}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={e => {
              onChangeHandler(e);
            }}
            readOnly={readonly}
            {...otherProps}
            ref={ref}
          />
          <span
            className={classNames(
              'input-field-title',
              { hiddenTitle: hidden },
              [isFocused ? 'active' : undefined, isError ? 'error' : undefined],
            )}
          >
            {fieldTitle}
          </span>

          {isError && (
            <div className="input-field-error-wrapper">
              <div className="input-field-error">
                <ErrorIcon className="input-field-error-img" />
                <span className="input-field-error-msg">{errorMesssage}</span>
              </div>
            </div>
          )}
        </div>
      );
    },
  ),
);
