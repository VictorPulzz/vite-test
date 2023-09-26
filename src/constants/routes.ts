export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  DOCUMENTS: '/documents',
  DOCUMENTS_INTERNAL: '/documents/internal',
  DOCUMENTS_CLIENT: '/documents/client',

  PROJECTS: '/projects',
  ADD_PROJECT: '/projects/add',
  EDIT_PROJECT: '/projects/:id/edit',
  PROJECT_DETAILS: '/projects/:id',
  PROJECT_DETAILS_OVERVIEW: '/projects/:id/overview',
  PROJECT_DETAILS_INFO: '/projects/:id/info',
  PROJECT_DETAILS_TEAM: '/projects/:id/team',
  PROJECT_DETAILS_DEVELOPMENT: '/projects/:id/development',
  PROJECT_DETAILS_DOCUMENTS: '/projects/:id/documents',
  PROJECT_DETAILS_REPORTS: '/projects/:id/reports',
  PROJECT_DETAILS_REPORTS_SUBMIT: '/projects/:id/reports/:reportId/submit',
  PROJECT_DETAILS_REPORTS_VIEW: '/projects/:id/reports/:reportId/view',
  PROJECT_DETAILS_HISTORY: '/projects/:id/history',
  PROJECT_DETAILS_INTEGRATIONS: '/projects/:id/integrations',

  USERS: '/users',
  ADD_USER: '/users/add',
  EDIT_USER: '/users/:id/edit',
  USER_DETAILS: '/users/:id',
  USER_DETAILS_DOCUMENTS: '/users/:id/documents',
  USER_DETAILS_HISTORY: '/users/:id/history',

  REPOSITORIES: '/repositories',
  ADD_REPOSITORY: '/repositories/add',
  REPOSITORY_DETAILS: '/repositories/:id',

  REQUESTS: '/requests',

  ROLES_AND_PERMISSIONS: '/roles-and-permissions',

  SETTINGS: '/settings',
  SETTINGS_SECURITY: '/settings/security',

  ADMIN_SETTINGS: '/admin-settings',
  ADMIN_SETTINGS_DOCUMENT_TEMPLATES: '/admin-settings/document-templates',
  ADMIN_SETTINGS_PROJECTS: '/admin-settings/projects',
  ADMIN_SETTINGS_REPORT_TEMPLATES: '/admin-settings/report-templates',
  ADMIN_SETTINGS_REPORT_TEMPLATES_ADD: '/admin-settings/report-templates/add',
  ADMIN_SETTINGS_REPORT_TEMPLATES_EDIT: '/admin-settings/report-templates/:id/edit',
}; /* as const satisfies Record<string, string> */ // todo: uncomment and fix related errors asap
