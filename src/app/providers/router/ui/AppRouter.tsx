import React, { Suspense, memo, useCallback, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  AppRouteProps,
  routeConfig,
} from 'shared/config/routeConfig/routeConfig';
import { Loader, LoaderTheme } from 'shared/ui/Loader/Loader';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    const element = (
      <Suspense
        fallback={
          <main className="page-wrapper">
            <Loader theme={LoaderTheme.BIG} />
          </main>
        }>
        <main className="page-wrapper">{route.element}</main>
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
