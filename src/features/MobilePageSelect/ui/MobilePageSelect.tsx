import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MobilePageSelect.module.scss';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';
import { Select, SelectOption } from '@/shared/ui/Select';
import { getSidebarItems } from '@/shared/lib/sidebar/selector/getSidebarItems';
import { useSelector } from 'react-redux';
import { getRouteMain } from '@/shared/const/router';
import { useLocation, useNavigate } from 'react-router-dom';

interface MobilePageSelectProps {
  className?: string;
}

export const MobilePageSelect = ({ className }: MobilePageSelectProps) => {
  const { t } = useTranslation();
  const sidebarItemsList = useSelector(getSidebarItems);
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);

  const categoryOptions = useMemo<SelectOption<string>[]>(
    () =>
      sidebarItemsList.map(el => {
        return {
          value: el.path,
          content: `${t(el.text)}`,
        };
      }),
    [t, sidebarItemsList],
  );

  const onChange = useCallback(
    (newVal: string) => {
      setCurrent(newVal);
      navigate(newVal);
    },
    [setCurrent, current],
  );

  return (
    <div className={cls.MobilePageSelectWrapper}>
      <Select
        submenuTheme="page-switcher"
        title={''}
        options={categoryOptions}
        value={current}
        onChange={onChange}
      />
    </div>
  );
};
