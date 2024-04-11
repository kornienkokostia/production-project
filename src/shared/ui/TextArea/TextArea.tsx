import { ChangeEvent, Ref, forwardRef, memo, useCallback } from 'react';
import cls from './TextArea.module.scss';

interface TextAreaProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const TextArea = memo(
  forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
      const { value, onChange, placeholder } = props;
      const onCommentTextChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
          const el = e.currentTarget;
          el.style.height = '56px';
          el.style.height = `${el.scrollHeight}px`;
          onChange(el.value);
        },
        [onChange],
      );
      return (
        <textarea
          className={cls.textarea}
          placeholder={placeholder}
          onChange={e => onCommentTextChange(e)}
          value={value}
          ref={ref}
        />
      );
    },
  ),
);
