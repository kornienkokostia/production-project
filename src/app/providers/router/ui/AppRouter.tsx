import { getUserAuthData } from 'entities/User';
import React, { Suspense, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { Loader, LoaderTheme } from 'shared/ui/Loader/Loader';

export const AppRouter = memo(() => {
  const isAuth = useSelector(getUserAuthData);

  const routes = useMemo(() => {
    return Object.values(routeConfig).filter(el => {
      if (el.authOnly && !isAuth) {
        return false;
      } else return true;
    });
  }, [isAuth]);

  return (
    <Suspense
      fallback={
        <div className="page-wrapper">
          <Loader theme={LoaderTheme.BIG} />
        </div>
      }
    >
      <Routes>
        {routes.map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={<div className="page-wrapper">{element}</div>}
          />
        ))}
      </Routes>
    </Suspense>
  );
});
