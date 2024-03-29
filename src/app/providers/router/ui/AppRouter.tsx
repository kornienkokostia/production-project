import React, { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from '@/shared/ui/Loader';
import { RequireAuth } from './RequireAuth';
import { AppRouteProps } from '@/shared/types/router';
import { routeConfig } from '../config/routeConfig';

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    const element = (
      <Suspense
        fallback={
          <main className="page-wrapper">
            <Loader />
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
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
