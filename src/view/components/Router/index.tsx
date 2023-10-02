import React, { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { useAppSelector } from '~/store/hooks';
import { Docs } from '~/view/components/Docs';
import { DocsType } from '~/view/components/Docs/types';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';
import { AdminSettingsDocumentTemplatesPage } from '~/view/pages/AdminSettingsDocumentTemplates';
import { AdminSettingsIntegrationsPage } from '~/view/pages/AdminSettingsIntegrations';
import { AdminSettingsProjectsPage } from '~/view/pages/AdminSettingsProjects';
import { AdminSettingsReportTemplatesPage } from '~/view/pages/AdminSettingsReportTemplates';
import { CreateOrUpdateProject } from '~/view/pages/CreateOrUpdateProject';
import { CreateOrUpdateReportTemplatePage } from '~/view/pages/CreateOrUpdateReportTemplate';
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
import { SubmitOrViewReportPage } from '~/view/pages/SubmitOrViewReport';
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
  const {
    canReadWriteInternalDocuments,
    canReadWriteClientsDocuments,
    canReadDocuments,
    canReadUserDocs,
    canReadUserHistory,
    canReadProjectOverview,
    canReadProjectInfo,
    canReadProjectTeam,
    canReadProjectDevelopment,
    canReadWriteProjectDocs,
    canReadProjectReports,
    canReadProjectHistory,
    canReadWriteProjectIntegrations,
    canReadUsersList,
    canReadProjectsList,
    canReadReposList,
    canWritePermissions,
    canWriteAdminSettings,
  } = useUserPermissions();

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
          path: ROUTES.PROJECT_DETAILS_REPORTS,
          element: canReadProjectReports ? (
            <Reports />
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
      ],
    },
    {
      path: ROUTES.PROJECT_DETAILS_REPORTS_SUBMIT,
      element: <SubmitOrViewReportPage />,
    },
    {
      path: ROUTES.PROJECT_DETAILS_REPORTS_VIEW,
      element: <SubmitOrViewReportPage />,
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
    {
      path: ROUTES.ADMIN_SETTINGS_PROJECTS,
      element: canWriteAdminSettings ? <AdminSettingsProjectsPage /> : <NoAccessPage />,
    },
    {
      path: ROUTES.ADMIN_SETTINGS_REPORT_TEMPLATES,
      element: canWriteAdminSettings ? <AdminSettingsReportTemplatesPage /> : <NoAccessPage />,
    },
    {
      path: ROUTES.ADMIN_SETTINGS_REPORT_TEMPLATES_ADD,
      element: <CreateOrUpdateReportTemplatePage />,
    },
    {
      path: ROUTES.ADMIN_SETTINGS_REPORT_TEMPLATES_EDIT,
      element: <CreateOrUpdateReportTemplatePage />,
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
  ]);
};
