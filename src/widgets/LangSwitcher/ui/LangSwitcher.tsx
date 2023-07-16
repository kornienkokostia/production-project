import { useTranslation } from 'react-i18next';
import { ChangeEvent, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
  const { i18n } = useTranslation();
  const onSwitcherChange = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      className={classNames(cls.LangSwitcher, {}, [className])}
      onChange={onSwitcherChange}
      value={
        localStorage.getItem('i18nextLng')
          ? (localStorage.getItem('i18nextLng') as string)
          : 'en'
      }
    >
      <option className={cls.option} value="en">
        English
      </option>
      <option className={cls.option} value="ru">
        Русский
      </option>
      <option className={cls.option} value="uk">
        Українська
      </option>
    </select>
  );
});
