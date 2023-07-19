import { useTranslation } from 'react-i18next';
import { ChangeEvent, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SettingsLangSwitcher.module.scss';

interface SettingsLangSwitcherProps {
  className?: string;
}

export const SettingsLangSwitcher = memo(
  ({ className }: SettingsLangSwitcherProps) => {
    const { i18n } = useTranslation();
    const onSwitcherChange = (e: ChangeEvent<HTMLSelectElement>) => {
      i18n.changeLanguage(e.target.value);
    };

    return (
      <select
        className={classNames(cls.SettingsLangSwitcher, {}, [className])}
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
  },
);
