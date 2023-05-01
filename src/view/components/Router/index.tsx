import React, { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { useAppSelector } from '~/store/hooks';
import { Docs } from '~/view/components/Docs';
import { DocsType } from '~/view/components/Docs/types';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { AdminSettingsIntegrationsPage } from '~/view/pages/AdminSettingsIntegrations';
import { CreateOrUpdateProject } from '~/view/pages/CreateOrUpdateProject';
import { CreateOrUpdateUserPage } from '~/view/pages/CreateOrUpdateUser';
import { CreateRepositoryPage } from '~/view/pages/CreateRepository';
import { DocumentsPage } from '~/view/pages/Documents';
import { ForgotPasswordPage } from '~/view/pages/ForgotPassword';
import { HomePage } from '~/view/pages/Home';
import { NotFoundPage } from '~/view/pages/NotFound';
import { ProjectDetailsPage } from '~/view/pages/ProjectDetails';
import { Integrations } from '~/view/pages/ProjectDetails/pages/ Integrations';
import { Development } from '~/view/pages/ProjectDetails/pages/Development';
import { History } from '~/view/pages/ProjectDetails/pages/History';
import { Info } from '~/view/pages/ProjectDetails/pages/Info';
import { Overview } from '~/view/pages/ProjectDetails/pages/Overview';
import { Reports } from '~/view/pages/ProjectDetails/pages/Reports';
import { Team } from '~/view/pages/ProjectDetails/pages/Team';
import { ProjectsPage } from '~/view/pages/Projects';
import { RepositoriesPage } from '~/view/pages/Repositories';
import { RepositoryDetailsPage } from '~/view/pages/RepositoryDetails';
import { Participants } from '~/view/pages/RepositoryDetails/components/RepositoryDetailsTabs/components/Participants';
import { RequestsPage } from '~/view/pages/Requests';
import { ResetPasswordPage } from '~/view/pages/ResetPassword';
import { RolesAndPermissionsPage } from '~/view/pages/RolesAndPermissions';
import { SettingsGeneralPage } from '~/view/pages/SettingsGeneral';
import { SettingsSecurityPage } from '~/view/pages/SettingsSecurity';
import { SignInPage } from '~/view/pages/SignIn';
import { UserDetailsPage } from '~/view/pages/UserDetails';
import { Projects } from '~/view/pages/UserDetails/components/UserDetailsTabs/components/Projects';
import { UserHistory } from '~/view/pages/UserDetails/components/UserDetailsTabs/components/UserHistory';
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
    children: [
      {
        index: true,
        element: <Docs type={DocsType.INTERNAL} />,
      },
      {
        path: ROUTES.DOCUMENTS_CLIENTS,
        element: <Docs type={DocsType.CLIENT} />,
      },
    ],
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
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: ROUTES.PROJECT_DETAILS_DEVELOPMENT,
        element: <Development />,
      },
      {
        path: ROUTES.PROJECT_DETAILS_DOCUMENTS,
        element: <Docs type={DocsType.PROJECT} />,
      },
      {
        path: ROUTES.PROJECT_DETAILS_HISTORY,
        element: <History />,
      },
      {
        path: ROUTES.PROJECT_DETAILS_INFO,
        element: <Info />,
      },
      {
        path: ROUTES.PROJECT_DETAILS_TEAM,
        element: <Team />,
      },
      {
        path: ROUTES.PROJECT_DETAILS_INTEGRATIONS,
        element: <Integrations />,
      },
      {
        path: ROUTES.PROJECT_DETAILS_REPORTS,
        element: <Reports />,
      },
    ],
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
    children: [
      {
        path: ROUTES.USER_DETAILS,
        element: <Projects />,
      },
      {
        path: ROUTES.USER_DETAILS_DOCUMENTS,
        element: <Docs type={DocsType.USER} />,
      },
      {
        path: ROUTES.USER_DETAILS_HISTORY,
        element: <UserHistory />,
      },
    ],
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
    children: [
      {
        index: true,
        element: <Participants />,
      },
    ],
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

  const canWritePermissions = useHasAccess(Permission.WRITE_PERMISSIONS);
  const canWriteAdminSettings = useHasAccess(Permission.WRITE_ADMIN_SETTINGS);

  return useRoutes([
    {
      children: [
        ...protectedRoutes,
        {
          path: ROUTES.ROLES_AND_PERMISSIONS,
          element: canWritePermissions ? (
            <RolesAndPermissionsPage />
          ) : (
            <Navigate to={ROUTES.HOME} />
          ),
        },
        {
          children: [
            {
              path: ROUTES.ADMIN_SETTINGS_INTEGRATIONS,
              element: canWriteAdminSettings ? (
                <AdminSettingsIntegrationsPage />
              ) : (
                <Navigate to={ROUTES.HOME} />
              ),
            },
          ],
        },
      ],
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
