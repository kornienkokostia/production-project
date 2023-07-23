import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MobilePageSelect.module.scss';
import { Select, SelectOption } from '@/shared/ui/Select';
import { getSidebarItems } from '@/shared/lib/sidebar/selector/getSidebarItems';
import { getRouteMain } from '@/shared/const/router';

interface MobilePageSelectProps {
  className?: string;
}

export const MobilePageSelect = ({ className }: MobilePageSelectProps) => {
  const { t } = useTranslation();
  const sidebarItemsList = useSelector(getSidebarItems);
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);

  const pagesOptions = useMemo<SelectOption<string>[]>(
    () =>
      sidebarItemsList.map(el => ({
        value: el.path,
        content: `${t(el.text)}`,
      })),
    [t, sidebarItemsList],
  );

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const onChange = useCallback(
    (newVal: string) => {
      setCurrent(newVal);
      navigate(newVal);
    },
    [setCurrent, navigate],
  );

  if (pagesOptions.filter(el => el.value === location.pathname).length === 0) {
    return null;
  }

  return (
    <div className={cls.MobilePageSelectWrapper}>
      <Select
        submenuTheme="page-switcher"
        title=""
        options={pagesOptions}
        value={current}
        onChange={onChange}
      />
    </div>
  );
};
