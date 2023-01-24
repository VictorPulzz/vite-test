import React, { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { useAppSelector } from '~/store/hooks';
import { CreateOrUpdateProjectPage } from '~/view/pages/CreateOrUpdateProject';
import { CreateOrUpdateUserPage } from '~/view/pages/CreateOrUpdateUser';
import { DocumentsPage } from '~/view/pages/Documents';
import { HomePage } from '~/view/pages/Home';
import { NotFoundPage } from '~/view/pages/NotFound';
import { ProjectDetailsPage } from '~/view/pages/ProjectDetails';
import { ProjectsPage } from '~/view/pages/Projects';
import { RepositoriesPage } from '~/view/pages/Repositories';
import { RepositoryDetailsPage } from '~/view/pages/RepositoryDetails';
import { SettingsGeneralPage } from '~/view/pages/SettingsGeneral';
import { SettingsSecurityPage } from '~/view/pages/SettingsSecurity';
import { SignInPage } from '~/view/pages/SignIn';
import { UserDetailsPage } from '~/view/pages/UserDetails';
import { UsersPage } from '~/view/pages/Users';

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
    path: ROUTES.PROJECT_DETAILS,
    element: <ProjectDetailsPage />,
  },
  {
    path: ROUTES.USERS,
    element: <UsersPage />,
  },
  {
    path: ROUTES.ADD_USER,
    element: <CreateOrUpdateUserPage />,
  },
  {
    path: ROUTES.EDIT_USER,
    element: <CreateOrUpdateUserPage />,
  },
  {
    path: ROUTES.USER_DETAILS,
    element: <UserDetailsPage />,
  },
  {
    path: ROUTES.REPOSITORIES,
    element: <RepositoriesPage />,
  },
  {
    path: ROUTES.REPOSITORY_DETAILS,
    element: <RepositoryDetailsPage />,
  },
  {
    path: ROUTES.SETTINGS,
    element: <SettingsGeneralPage />,
  },
  {
    path: ROUTES.SETTINGS_SECURITY,
    element: <SettingsSecurityPage />,
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
