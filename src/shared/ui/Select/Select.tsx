import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import SelectIcon from '@/shared/assets/icons/select-btn-icon.svg';
import SelectedOptionIcon from '@/shared/assets/icons/selected-option.svg';
import cls from './Select.module.scss';
import { Button } from '../Button/Button';
import { Submenu, SubmenuTheme } from '../Submenu/Submenu';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string, K extends string> {
  className?: string;
  submenuTheme: SubmenuTheme;
  title: string;
  options: SelectOption<T>[];
  value: T;
  order?: K;
  onChange: (value: T) => void;
  onChangeOrder?: (value: K) => void;
  sidebarPadding?: boolean;
}

export const Select = <T extends string, K extends string>(
  props: SelectProps<T, K>,
) => {
  const {
    className,
    submenuTheme,
    title,
    options,
    value,
    order,
    onChange,
    onChangeOrder,
    sidebarPadding = false,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const delayRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const [currentSelected, setCurrentSelected] = useState<T>(value);
  const [showHoverOnKeyPress, setShowHoverOnKeyPress] = useState(false);
  const [blockHover, setBlockHover] = useState(false);

  const closeHandler = useCallback(() => {
    setIsClosing(true);
    timeRef.current = setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, 200);
  }, [setIsOpen]);

  useEffect(
    () => () => {
      clearTimeout(timeRef.current);
      clearTimeout(delayRef.current);
    },
    [],
  );

  const onOptionClick = useCallback(
    (val: string) => {
      delayRef.current = setTimeout(() => {
        if (val !== value) {
          onChange(val as T);
          onChangeOrder?.('asc' as K);
        } else {
          onChangeOrder?.(order === 'asc' ? ('desc' as K) : ('asc' as K));
        }
      }, 150);

      closeHandler();
    },
    [value, onChangeOrder, onChange, order, closeHandler],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === 'ArrowUp') {
          options.forEach((el, i) => {
            if (el.value === currentSelected && i > 0) {
              setCurrentSelected(options[i - 1].value);
            }
          });
          setShowHoverOnKeyPress(true);
          setBlockHover(true);
        }
        if (e.key === 'ArrowDown') {
          options.forEach((el, i) => {
            if (el.value === currentSelected && i < options.length - 1) {
              setCurrentSelected(options[i + 1].value);
            }
          });
          setShowHoverOnKeyPress(true);
          setBlockHover(true);
        }
        if (e.key === 'Enter') {
          if (showHoverOnKeyPress) {
            onOptionClick(currentSelected);
          }
        }
      }
    },
    [isOpen, currentSelected, options, showHoverOnKeyPress, onOptionClick],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  const onToggleBtn = useCallback(() => {
    setIsOpen(prev => !prev);
    setShowHoverOnKeyPress(false);
  }, [setShowHoverOnKeyPress]);

  return (
    <div className={classNames(cls.Select, {}, [className])}>
      <Button
        theme="apple-clear"
        onClick={onToggleBtn}
        className={cls.selectBtn}
      >
        <span>
          {`${title} ${options.find(el => el.value === value)?.content}`}
        </span>
        <SelectIcon className={cls.selectBtnIcon} />
      </Button>
      <Submenu
        isOpen={isOpen}
        closeHandler={closeHandler}
        theme={submenuTheme}
        showTriangle
        isClosing={isClosing}
        sidebarPadding={sidebarPadding}
      >
        <div className={cls.options}>
          {options.map(el => (
            <div
              key={el.value}
              className={classNames(
                cls.option,
                {
                  [cls.selected]: el.value === value,
                  [cls.hovered]:
                    el.value === currentSelected && showHoverOnKeyPress,
                  [cls.blockHover]: blockHover,
                },
                [],
              )}
              onClick={() => onOptionClick(el.value)}
              onMouseEnter={() => {
                setShowHoverOnKeyPress(true);
                setCurrentSelected(el.value);
              }}
              onMouseMove={() => {
                setBlockHover(false);
              }}
              onMouseLeave={() => setShowHoverOnKeyPress(false)}
            >
              {el.value === value && (
                <SelectedOptionIcon className={cls.selectedIcon} />
              )}
              <span className={cls.optionText}>{el.content}</span>
              {el.value === value && order && (
                <SelectIcon
                  className={classNames(cls.orderIcon, {}, [
                    order === 'asc' ? cls.asc : cls.desc,
                  ])}
                />
              )}
            </div>
          ))}
        </div>
      </Submenu>
    </div>
  );
};
