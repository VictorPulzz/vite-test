import React, { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { useAppSelector } from '~/store/hooks';
import { Docs } from '~/view/components/Docs';
import { DocsType } from '~/view/components/Docs/types';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { AdminSettingsDocumentTemplatesPage } from '~/view/pages/AdminSettingsDocumentTemplates';
import { AdminSettingsIntegrationsPage } from '~/view/pages/AdminSettingsIntegrations';
import { CreateOrUpdateProject } from '~/view/pages/CreateOrUpdateProject';
import { CreateOrUpdateUserPage } from '~/view/pages/CreateOrUpdateUser';
import { CreateRepositoryPage } from '~/view/pages/CreateRepository';
import { DocumentsPage } from '~/view/pages/Documents';
import { ForgotPasswordPage } from '~/view/pages/ForgotPassword';
import { HomePage } from '~/view/pages/Home';
import { LeadDetailsPage } from '~/view/pages/LeadDetails';
import { About } from '~/view/pages/LeadDetails/pages/About';
import { Messages } from '~/view/pages/LeadDetails/pages/Messages';
import { LeadsPage } from '~/view/pages/Leads';
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

import { NoAccessMessage } from '../NoAccessMessage';
import { NoAccessPage } from '../NoAccessPage';
import { AvailableDocumentsRouteRedirect } from './components/AvailableDocumentsRouteRedirect';
import { AvailableProjectRouteRedirect } from './components/AvailableProjectRouteRedirect';

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

export const Router: FC = () => {
  const isAuthorized = useAppSelector(state => !!state.user.auth);

  const canReadWriteInternalDocuments = useHasAccess(Permission.READ_WRITE_INTERNAL_DOCS);
  const canReadWriteClientsDocuments = useHasAccess(Permission.READ_WRITE_CLIENTS_DOCS);
  const canReadDocuments = canReadWriteInternalDocuments || canReadWriteClientsDocuments;

  const canReadUserDocs = useHasAccess(Permission.READ_USER_DOCS);
  const canReadUserHistory = useHasAccess(Permission.READ_USER_HISTORY);

  const canReadProjectOverview = useHasAccess(Permission.READ_PROJECT_OVERVIEW);
  const canReadProjectInfo = useHasAccess(Permission.READ_PROJECT_INFO);
  const canReadProjectTeam = useHasAccess(Permission.READ_PROJECT_TEAM);
  const canReadProjectDevelopment = useHasAccess(Permission.READ_PROJECT_DEVELOPMENT);
  const canReadWriteProjectDocs = useHasAccess(Permission.READ_WRITE_PROJECT_DOCS);
  const canReadProjectHistory = useHasAccess(Permission.READ_PROJECT_HISTORY);
  const canReadWriteProjectIntegrations = useHasAccess(Permission.READ_WRITE_PROJECT_INTEGRATIONS);

  const canReadUsersList = useHasAccess(Permission.READ_USERS_LIST);
  const canReadProjectsList = useHasAccess(Permission.READ_PROJECTS_LIST);
  const canReadReposList = useHasAccess(Permission.READ_REPOS_LIST);

  const canWritePermissions = useHasAccess(Permission.WRITE_PERMISSIONS);
  const canWriteAdminSettings = useHasAccess(Permission.WRITE_ADMIN_SETTINGS);

  const protectedRoutes: RouteObject[] = [
    {
      path: ROUTES.HOME,
      element: <HomePage />,
    },
    {
      path: ROUTES.DOCUMENTS,
      element: canReadDocuments ? <DocumentsPage /> : <NoAccessPage />,
      children: [
        {
          index: true,
          element: <AvailableDocumentsRouteRedirect />,
        },
        {
          path: ROUTES.DOCUMENTS_INTERNAL,
          element: canReadWriteInternalDocuments ? (
            <Docs type={DocsType.INTERNAL} />
          ) : (
            <NoAccessMessage className="h-full flex-auto" />
          ),
        },
        {
          path: ROUTES.DOCUMENTS_CLIENT,
          element: canReadWriteClientsDocuments ? (
            <Docs type={DocsType.CLIENT} />
          ) : (
            <NoAccessMessage className="h-full flex-auto" />
          ),
        },
      ],
    },
    {
      path: ROUTES.PROJECTS,
      element: canReadProjectsList ? <ProjectsPage /> : <NoAccessPage />,
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
          element: <AvailableProjectRouteRedirect />,
        },
        {
          path: ROUTES.PROJECT_DETAILS_OVERVIEW,
          element: canReadProjectOverview ? (
            <Overview />
          ) : (
            <NoAccessMessage className="h-full flex-auto" />
          ),
        },
        {
          path: ROUTES.PROJECT_DETAILS_DEVELOPMENT,
          element: canReadProjectDevelopment ? (
            <Development />
          ) : (
            <NoAccessMessage className="h-full flex-auto" />
          ),
        },
        {
          path: ROUTES.PROJECT_DETAILS_DOCUMENTS,
          element: canReadWriteProjectDocs ? (
            <Docs type={DocsType.PROJECT} />
          ) : (
            <NoAccessMessage className="h-full flex-auto" />
          ),
        },
        {
          path: ROUTES.PROJECT_DETAILS_HISTORY,
          element: canReadProjectHistory ? (
            <History />
          ) : (
            <NoAccessMessage className="h-full flex-auto" />
          ),
        },
        {
          path: ROUTES.PROJECT_DETAILS_INFO,
          element: canReadProjectInfo ? <Info /> : <NoAccessMessage className="h-full flex-auto" />,
        },
        {
          path: ROUTES.PROJECT_DETAILS_TEAM,
          element: canReadProjectTeam ? <Team /> : <NoAccessMessage className="h-full flex-auto" />,
        },
        {
          path: ROUTES.PROJECT_DETAILS_INTEGRATIONS,
          element: canReadWriteProjectIntegrations ? (
            <Integrations />
          ) : (
            <NoAccessMessage className="h-full flex-auto" />
          ),
        },
        {
          path: ROUTES.PROJECT_DETAILS_REPORTS,
          element: <Reports />,
        },
      ],
    },
    {
      path: ROUTES.USERS,
      element: canReadUsersList ? <UsersPage /> : <NoAccessPage />,
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
          index: true,
          element: <Projects />,
        },
        {
          path: ROUTES.USER_DETAILS_DOCUMENTS,
          element: canReadUserDocs ? (
            <Docs type={DocsType.USER} />
          ) : (
            <NoAccessMessage className="h-full flex-auto" />
          ),
        },
        {
          path: ROUTES.USER_DETAILS_HISTORY,
          element: canReadUserHistory ? (
            <UserHistory />
          ) : (
            <NoAccessMessage className="h-full flex-auto" />
          ),
        },
      ],
    },
    {
      path: ROUTES.REPOSITORIES,
      element: canReadReposList ? <RepositoriesPage /> : <NoAccessPage />,
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
      path: ROUTES.REQUESTS,
      element: <RequestsPage />,
    },
    {
      path: ROUTES.ROLES_AND_PERMISSIONS,
      element: canWritePermissions ? <RolesAndPermissionsPage /> : <NoAccessPage />,
    },
    {
      path: ROUTES.SETTINGS,
      element: <SettingsGeneralPage />,
    },
    {
      path: ROUTES.SETTINGS_SECURITY,
      element: <SettingsSecurityPage />,
    },
    {
      path: ROUTES.ADMIN_SETTINGS,
      element: canWriteAdminSettings ? <AdminSettingsIntegrationsPage /> : <NoAccessPage />,
    },
    {
      path: ROUTES.ADMIN_SETTINGS_DOCUMENT_TEMPLATES,
      element: canWriteAdminSettings ? <AdminSettingsDocumentTemplatesPage /> : <NoAccessPage />,
    },
  ];

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
    {
      path: ROUTES.LEADS,
      element: <LeadsPage />,
    },
    {
      path: ROUTES.LEAD_DETAILS,
      element: <LeadDetailsPage />,
      children: [
        {
          index: true,
          element: <About />,
        },
        {
          path: ROUTES.LEAD_MESSAGES,
          index: true,
          element: <Messages />,
        },
      ],
    },
  ]);
};
