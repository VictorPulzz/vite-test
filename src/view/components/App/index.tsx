import { Toaster } from '@ui/components/common/Toaster';
import React, { useLayoutEffect } from 'react';
import { Navigate, RouteObject, useLocation, useRoutes } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { useAppSelector } from '~/store/hooks';
import { MainPage } from '~/view/pages/Main';
import { NotFoundPage } from '~/view/pages/NotFound';
import { SignInPage } from '~/view/pages/SignIn';

import styles from './styles.module.scss';

const authRoutes: RouteObject[] = [
  {
    path: ROUTES.SIGN_IN,
    element: <SignInPage />,
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <MainPage />,
  },
];

export const App: React.FC = () => {
  const location = useLocation();
  const isAuthorized = useAppSelector(state => !!state.user.auth);

  const routes = useRoutes([
    {
      children: protectedRoutes,
      element: !isAuthorized ? <Navigate to={ROUTES.SIGN_IN} /> : undefined,
    },
    {
      children: authRoutes,
      element: isAuthorized ? <Navigate to={ROUTES.HOME} /> : undefined,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className={styles['app-wrapper']}>
      {routes}
      <Toaster />
    </main>
  );
};
