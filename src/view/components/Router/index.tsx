import React, { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { useAppSelector } from '~/store/hooks';
import { CreateOrUpdateProjectPage } from '~/view/pages/CreateProject';
import { DocumentsPage } from '~/view/pages/Documents';
import { HomePage } from '~/view/pages/Home';
import { NotFoundPage } from '~/view/pages/NotFound';
import { ProjectsPage } from '~/view/pages/Projects';
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
    element: <HomePage />,
  },
  {
    path: ROUTES.DOCUMENTS,
    element: <DocumentsPage />,
  },
  {
    path: ROUTES.PROJECTS,
    element: <ProjectsPage />,
  },
  {
    path: ROUTES.ADD_PROJECT,
    element: <CreateOrUpdateProjectPage />,
  },
  {
    path: ROUTES.EDIT_PROJECT,
    element: <CreateOrUpdateProjectPage />,
  },
  {
    path: ROUTES.EMPLOYEES,
    element: <ProjectsPage />,
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
