import { Permission } from '~/constants/permissions';

import { useHasAccess } from './useHasAccess';

export function useUserPermissions() {
  const canWriteUserDocs = useHasAccess(Permission.WRITE_USER_DOCS);
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
  const canReadProjectReports = useHasAccess(Permission.READ_PROJECT_REPORTS);
  const canReadProjectHistory = useHasAccess(Permission.READ_PROJECT_HISTORY);
  const canReadWriteProjectIntegrations = useHasAccess(Permission.READ_WRITE_PROJECT_INTEGRATIONS);
  const canReadUsersList = useHasAccess(Permission.READ_USERS_LIST);
  const canReadProjectsList = useHasAccess(Permission.READ_PROJECTS_LIST);
  const canReadReposList = useHasAccess(Permission.READ_REPOS_LIST);
  const canWritePermissions = useHasAccess(Permission.WRITE_PERMISSIONS);
  const canWriteAdminSettings = useHasAccess(Permission.WRITE_ADMIN_SETTINGS);
  const canReadLeads = useHasAccess(Permission.READ_LEADS);
  const canReadUserDetails = useHasAccess(Permission.READ_USER_DETAILS);
  const canWriteProject = useHasAccess(Permission.WRITE_PROJECT);
  const canWriteProjectEnvs = useHasAccess(Permission.WRITE_PROJECT_ENVS);
  const canWriteProjectIntegrations = useHasAccess(Permission.WRITE_PROJECT_INTEGRATIONS);
  const canCreateRepository = useHasAccess(Permission.CREATE_REPOSITORY);
  const canReadProjectStatistics = useHasAccess(Permission.READ_PROJECT_STATISTICS);
  const canWriteProjectTeam = useHasAccess(Permission.WRITE_PROJECT_TEAM);
  const canCreateProject = useHasAccess(Permission.CREATE_PROJECT);
  const canWriteRepository = useHasAccess(Permission.WRITE_REPOSITORY);
  const canReadRepoDetails = useHasAccess(Permission.READ_REPO_DETAILS);
  const canWriteRepoParticipants = useHasAccess(Permission.WRITE_REPO_PARTICIPANTS);
  const canWriteUser = useHasAccess(Permission.WRITE_USER);
  const canCreateUser = useHasAccess(Permission.CREATE_USER);

  return {
    canWriteUserDocs,
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
    canReadLeads,
    canReadUserDetails,
    canWriteProject,
    canWriteProjectEnvs,
    canWriteProjectIntegrations,
    canCreateRepository,
    canReadProjectStatistics,
    canWriteProjectTeam,
    canCreateProject,
    canWriteRepository,
    canReadRepoDetails,
    canWriteRepoParticipants,
    canWriteUser,
    canCreateUser,
  };
}
