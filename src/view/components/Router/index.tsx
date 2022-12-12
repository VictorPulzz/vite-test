import React, { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { useAppSelector } from '~/store/hooks';
import { MainPage } from '~/view/pages/Main';
import { NotFoundPage } from '~/view/pages/NotFound';
import { SignInPage } from '~/view/pages/SignIn';

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

export const Router: FC = () => {
  const isAuthorized = useAppSelector(state => !!state.user.auth);

  return useRoutes([
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
};
