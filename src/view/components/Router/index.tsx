import React, { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { useAppSelector } from '~/store/hooks';
import { CreateOrUpdateProject } from '~/view/pages/CreateOrUpdateProject';
import { CreateOrUpdateUserPage } from '~/view/pages/CreateOrUpdateUser';
import { CreateRepositoryPage } from '~/view/pages/CreateRepository';
import { DocumentsPage } from '~/view/pages/Documents';
import { ForgotPasswordPage } from '~/view/pages/ForgotPassword';
import { HomePage } from '~/view/pages/Home';
import { NotFoundPage } from '~/view/pages/NotFound';
import { ProjectDetailsPage } from '~/view/pages/ProjectDetails';
import { ProjectsPage } from '~/view/pages/Projects';
import { RepositoriesPage } from '~/view/pages/Repositories';
import { RepositoryDetailsPage } from '~/view/pages/RepositoryDetails';
import { RequestsPage } from '~/view/pages/Requests';
import { ResetPasswordPage } from '~/view/pages/ResetPassword';
import { RolesAndPermissionsPage } from '~/view/pages/RolesAndPermissions';
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
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
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
    element: <CreateOrUpdateProject />,
  },
  {
    path: ROUTES.EDIT_PROJECT,
    element: <CreateOrUpdateProject />,
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
    path: ROUTES.REQUESTS,
    element: <RequestsPage />,
  },
  {
    path: ROUTES.ADD_REPOSITORY,
    element: <CreateRepositoryPage />,
  },

  {
    path: ROUTES.REPOSITORY_DETAILS,
    element: <RepositoryDetailsPage />,
  },
  {
    path: ROUTES.ROLES_AND_PERMISSIONS,
    element: <RolesAndPermissionsPage />,
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
      path: ROUTES.RESET_PASSWORD,
      element: <ResetPasswordPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
};
