/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  Upload: File;
};

export type ActiveInput = {
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
};

export type BoilerplateFilter = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  platform?: InputMaybe<RepositoryPlatformChoice>;
  type?: InputMaybe<RepositoryTypeChoice>;
};

export type BoilerplateType = {
  gitRepoId?: Maybe<Scalars['String']>;
  gitTfRepoId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  platform?: Maybe<RepositoryPlatformChoice>;
  type?: Maybe<RepositoryTypeChoice>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type ClientInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  notes?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  pointContact?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<Scalars['String']>;
};

export type ClientPointContactInput = {
  id: Scalars['Int'];
  pointContact: Scalars['Boolean'];
};

export type ClientType = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  notes?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  pointContact?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Scalars['String']>;
};

export enum ContractChoice {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
}

export type DepartmentType = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type DocumentCategoryType = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type DocumentFilter = {
  addedById?: InputMaybe<Scalars['Int']>;
  categoryId?: InputMaybe<Scalars['Int']>;
  internal?: InputMaybe<Scalars['Boolean']>;
  projectId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type DocumentGenerateFieldInput = {
  name: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type DocumentGenerateInput = {
  categoryId?: InputMaybe<Scalars['Int']>;
  fields?: InputMaybe<Array<DocumentGenerateFieldInput>>;
  projectId?: InputMaybe<Scalars['Int']>;
  templateId: Scalars['Int'];
  userId?: InputMaybe<Scalars['Int']>;
};

export type DocumentInput = {
  categoryId?: InputMaybe<Scalars['Int']>;
  file: Scalars['Upload'];
  id?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export enum DocumentSort {
  CREATED_AT = 'created_at',
}

export type DocumentSortFieldInput = {
  direction: OrderDirectionChoice;
  field: DocumentSort;
};

export type DocumentTemplateFieldInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type DocumentTemplateFieldType = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type DocumentTemplateInput = {
  fields: Array<DocumentTemplateFieldInput>;
  name: Scalars['String'];
  url: Scalars['String'];
};

export type DocumentTemplateType = {
  fields?: Maybe<Array<DocumentTemplateFieldType>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type DocumentType = {
  addedBy?: Maybe<ProfileType>;
  category?: Maybe<DocumentCategoryType>;
  createdAt: Scalars['DateTime'];
  file: FileType;
  id: Scalars['Int'];
  internal: Scalars['Boolean'];
  project?: Maybe<ProjectType>;
  user?: Maybe<ProfileType>;
};

export type DocumentTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<DocumentType>;
};

export type EnvironmentCredentialsInput = {
  login: Scalars['String'];
  password: Scalars['String'];
  url: Scalars['String'];
};

export type EnvironmentCredentialsType = {
  id: Scalars['Int'];
  login: Scalars['String'];
  password: Scalars['String'];
  url: Scalars['String'];
};

export type FileType = {
  fileName: Scalars['String'];
  size: Scalars['Int'];
  url: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type ForgotPasswordType = {
  email: Scalars['String'];
  message: Scalars['String'];
};

export type GitInitialUserId = {
  userId: Scalars['Int'];
};

export type GitInitialUserInput = {
  accessLevel: RepositoryAccessLevelChoice;
  userId: Scalars['Int'];
};

export enum GitInitialUserSort {
  ACCESSLEVEL = 'accessLevel',
  DEPARTMENT = 'department',
  EMAIL = 'email',
  FULLNAME = 'fullName',
}

export type GitInitialUserSortFieldInput = {
  direction: OrderDirectionChoice;
  field: GitInitialUserSort;
};

export type GitInitialUserType = {
  accessLevel: RepositoryAccessLevelChoice;
  user: ProfileType;
};

export type GitInitialUserTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<GitInitialUserType>;
};

export enum GitPlatformEnum {
  BITBUCKET = 'BITBUCKET',
  GITLAB = 'GITLAB',
}

export type IdInput = {
  id: Scalars['Int'];
};

export type IdNameInput = {
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type IntegrationCredentialsInput = {
  id?: InputMaybe<Scalars['Int']>;
  key?: InputMaybe<Scalars['String']>;
  login?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type IntegrationCredentialsType = {
  id: Scalars['Int'];
  key?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type IntegrationKeyInput = {
  id?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
  value: Scalars['String'];
};

export type IntegrationKeyType = {
  id: Scalars['Int'];
  title: Scalars['String'];
  value: Scalars['String'];
};

export type LogFilter = {
  createdById?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type LogType = {
  createdAt: Scalars['DateTime'];
  createdBy: ProfileType;
  id: Scalars['Int'];
  message: Scalars['String'];
};

export type LogTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<LogType>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginSuccessType = {
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: UserType;
};

export type MessageType = {
  message: Scalars['String'];
};

export type Mutation = {
  /** Update client point contact */
  clientMakePointContact: ClientType;
  /** Create or update client document */
  documentClientCreateUpdate: DocumentType;
  /** Generate client document */
  documentClientGenerate: Array<DocumentType>;
  /** Delete document */
  documentDelete: MessageType;
  /** Create or update internal document */
  documentInternalCreateUpdate: DocumentType;
  /** Generate internal document */
  documentInternalGenerate: Array<DocumentType>;
  /** Create or update project document */
  documentProjectCreateUpdate: DocumentType;
  /** Generate project document */
  documentProjectGenerate: Array<DocumentType>;
  /** Create document template */
  documentTemplateCreate: DocumentTemplateType;
  /** Delete document template */
  documentTemplateDelete: MessageType;
  /** Create or update user document */
  documentUserCreateUpdate: DocumentType;
  /** Generate user document */
  documentUserGenerate: Array<DocumentType>;
  /** Sending reset password email */
  forgotPassword: ForgotPasswordType;
  /** Add or update git initial user */
  gitInitialUserCreateUpdate: GitInitialUserType;
  /** Delete git initial user */
  gitInitialUserDelete: MessageType;
  /** Login */
  login: LoginSuccessType;
  /** User updating himself */
  meUpdate: ProfileType;
  /** Update notification */
  notificationUpdate: NotificationType;
  /** Change password */
  passwordChange: MessageType;
  /** Update permissions */
  permissionsUpdate: Array<PermissionType>;
  /** Project add member */
  projectAddMember: ProjectMemberType;
  /** Project add slack */
  projectAddSlackChannel: ProjectSlackType;
  /** Project integration with git */
  projectConnectToGit: ProjectType;
  /** Project creation */
  projectCreate: ProjectType;
  /** Project deletion */
  projectDelete: MessageType;
  /** Project delete member */
  projectDeleteMember: MessageType;
  /** Project create or update environment */
  projectEnvironmentCreateUpdate: ProjectEnvironmentType;
  /** Project delete environment */
  projectEnvironmentDelete: MessageType;
  /** Project create or update integration */
  projectIntegrationCreateUpdate: ProjectIntegrationType;
  /** Project delete integration */
  projectIntegrationDelete: MessageType;
  /** Project status creation/updating by id */
  projectStatusCreateUpdate: ProjectStatusType;
  /** Project status deletion by id */
  projectStatusDelete: MessageType;
  /** Project update */
  projectUpdate: ProjectType;
  /** Repository creation */
  repositoryCreate: RepositoryType;
  /** Repository deletion */
  repositoryDelete: MessageType;
  /** Repository participant creation or update */
  repositoryParticipantCreateUpdate: RepositoryParticipantType;
  /** Repository participant deleting */
  repositoryParticipantDelete: MessageType;
  /** Repository update */
  repositoryUpdate: RepositoryType;
  /** Create requests */
  requestCreate: RequestType;
  /** Update request */
  requestUpdate: RequestType;
  /** Reset password */
  resetPassword: MessageType;
  /** Repository's secrets creation/updating */
  secretsAddUpdate: MessageType;
  /** User creation */
  signup: MessageType;
  /** Create Slack channel template */
  slackTemplateCreate: SlackChannelTemplateType;
  /** Delete Slack channel template */
  slackTemplateDelete: MessageType;
  /** Update Slack channel template */
  slackTemplateUpdate: SlackChannelTemplateType;
  /** Refreshing of tokens */
  tokenRefresh: LoginSuccessType;
  /** Change user status */
  userChangeStatus: UserType;
  /** Connect user with bitbucket */
  userConnectBitbucket: UserType;
  /** User create or updating */
  userCreateUpdate: UserType;
  /** User deletion */
  userDelete: MessageType;
  /** Add user note */
  userNote: NoteType;
};

export type MutationClientMakePointContactArgs = {
  data: ClientPointContactInput;
};

export type MutationDocumentClientCreateUpdateArgs = {
  data: DocumentInput;
};

export type MutationDocumentClientGenerateArgs = {
  data: Array<DocumentGenerateInput>;
};

export type MutationDocumentDeleteArgs = {
  data: IdInput;
};

export type MutationDocumentInternalCreateUpdateArgs = {
  data: DocumentInput;
};

export type MutationDocumentInternalGenerateArgs = {
  data: Array<DocumentGenerateInput>;
};

export type MutationDocumentProjectCreateUpdateArgs = {
  data: DocumentInput;
};

export type MutationDocumentProjectGenerateArgs = {
  data: Array<DocumentGenerateInput>;
};

export type MutationDocumentTemplateCreateArgs = {
  data: DocumentTemplateInput;
};

export type MutationDocumentTemplateDeleteArgs = {
  data: IdInput;
};

export type MutationDocumentUserCreateUpdateArgs = {
  data: DocumentInput;
};

export type MutationDocumentUserGenerateArgs = {
  data: Array<DocumentGenerateInput>;
};

export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
};

export type MutationGitInitialUserCreateUpdateArgs = {
  data: GitInitialUserInput;
};

export type MutationGitInitialUserDeleteArgs = {
  data: GitInitialUserId;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationMeUpdateArgs = {
  data: ProfileInput;
};

export type MutationNotificationUpdateArgs = {
  data: NotificationUpdateInput;
};

export type MutationPasswordChangeArgs = {
  data: ChangePasswordInput;
};

export type MutationPermissionsUpdateArgs = {
  data: Array<PermissionInput>;
};

export type MutationProjectAddMemberArgs = {
  data: ProjectMemberInput;
};

export type MutationProjectAddSlackChannelArgs = {
  data: ProjectSlackInput;
};

export type MutationProjectConnectToGitArgs = {
  data: ProjectGitIntegrationInput;
};

export type MutationProjectCreateArgs = {
  data: ProjectCreateInput;
};

export type MutationProjectDeleteArgs = {
  data: IdInput;
};

export type MutationProjectDeleteMemberArgs = {
  data: ProjectMemberInput;
};

export type MutationProjectEnvironmentCreateUpdateArgs = {
  data: ProjectEnvironmentInput;
};

export type MutationProjectEnvironmentDeleteArgs = {
  data: IdInput;
};

export type MutationProjectIntegrationCreateUpdateArgs = {
  data: ProjectIntegrationInput;
};

export type MutationProjectIntegrationDeleteArgs = {
  data: IdInput;
};

export type MutationProjectStatusCreateUpdateArgs = {
  data: IdNameInput;
};

export type MutationProjectStatusDeleteArgs = {
  data: IdInput;
};

export type MutationProjectUpdateArgs = {
  data: ProjectUpdateInput;
};

export type MutationRepositoryCreateArgs = {
  data: RepositoryCreateInput;
};

export type MutationRepositoryDeleteArgs = {
  data: IdInput;
};

export type MutationRepositoryParticipantCreateUpdateArgs = {
  data: RepositoryParticipantInput;
};

export type MutationRepositoryParticipantDeleteArgs = {
  data: RepositoryParticipantInput;
};

export type MutationRepositoryUpdateArgs = {
  data: RepositoryUpdateInput;
};

export type MutationRequestCreateArgs = {
  data: RequestCreateInput;
};

export type MutationRequestUpdateArgs = {
  data: RequestUpdateInput;
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type MutationSecretsAddUpdateArgs = {
  data: RepositorySecretsInput;
};

export type MutationSignupArgs = {
  data: LoginInput;
};

export type MutationSlackTemplateCreateArgs = {
  data: SlackChannelTemplateInput;
};

export type MutationSlackTemplateDeleteArgs = {
  data: IdInput;
};

export type MutationSlackTemplateUpdateArgs = {
  data: SlackChannelTemplateInput;
};

export type MutationTokenRefreshArgs = {
  data: RefreshTokenInput;
};

export type MutationUserChangeStatusArgs = {
  data: ActiveInput;
};

export type MutationUserConnectBitbucketArgs = {
  data: IdInput;
};

export type MutationUserCreateUpdateArgs = {
  data: UserInput;
};

export type MutationUserNoteArgs = {
  data: NoteInput;
};

export type NoteInput = {
  id?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
  userId: Scalars['Int'];
};

export type NoteType = {
  createdBy?: Maybe<ProfileType>;
  id: Scalars['Int'];
  text: Scalars['String'];
};

export type NotificationType = {
  createdAt: Scalars['DateTime'];
  externalId: Scalars['Int'];
  id: Scalars['Int'];
  isNew: Scalars['Boolean'];
  message: Scalars['String'];
  type: NotificationTypeChoice;
};

export enum NotificationTypeChoice {
  ADDED_PROJECT = 'ADDED_PROJECT',
  ADDED_REPOSITORY = 'ADDED_REPOSITORY',
  ASSIGNED_REQUEST = 'ASSIGNED_REQUEST',
  FILL_REPORT = 'FILL_REPORT',
  UNASSIGNED_REQUEST = 'UNASSIGNED_REQUEST',
}

export type NotificationTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<NotificationType>;
};

export type NotificationUpdateInput = {
  id: Scalars['Int'];
  isNew: Scalars['Boolean'];
};

export enum OrderDirectionChoice {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type PermissionInput = {
  id: Scalars['Int'];
  roles: Array<Scalars['Int']>;
};

export type PermissionType = {
  id: Scalars['Int'];
  name: Scalars['String'];
  roles?: Maybe<Array<RoleType>>;
  rolesList?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
};

export type PlatformType = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type PlatformTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<PlatformType>;
};

export type PorjectIntegrationsPage = {
  gitGroupId?: Maybe<Scalars['String']>;
  slackChannels?: Maybe<Array<ProjectSlackType>>;
};

export type ProfileInput = {
  address?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['Upload']>;
};

export type ProfileType = {
  address?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  department?: Maybe<DepartmentType>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<FileType>;
  role?: Maybe<RoleType>;
};

export type ProjectCreateInput = {
  clientTeam?: InputMaybe<Array<ClientInput>>;
  design?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  gitPlatform?: InputMaybe<GitPlatformEnum>;
  hoursEstimated?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  phase?: InputMaybe<ProjectPhaseChoice>;
  platforms?: InputMaybe<Array<Scalars['Int']>>;
  roadmap?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  statusId?: InputMaybe<Scalars['Int']>;
};

export enum ProjectEnvironmentChoice {
  DEV = 'DEV',
  PROD = 'PROD',
  STAGE = 'STAGE',
}

export type ProjectEnvironmentInput = {
  backendCredentials?: InputMaybe<EnvironmentCredentialsInput>;
  frontendCredentials?: InputMaybe<EnvironmentCredentialsInput>;
  id?: InputMaybe<Scalars['Int']>;
  name: ProjectEnvironmentChoice;
  projectId: Scalars['Int'];
};

export type ProjectEnvironmentType = {
  backendCredentials?: Maybe<EnvironmentCredentialsType>;
  frontendCredentials?: Maybe<EnvironmentCredentialsType>;
  id: Scalars['Int'];
  name: ProjectEnvironmentChoice;
  projectId: Scalars['Int'];
};

export type ProjectFilter = {
  inGit?: InputMaybe<Scalars['Boolean']>;
  statusId?: InputMaybe<Scalars['Int']>;
};

export type ProjectGitIntegrationInput = {
  id: Scalars['Int'];
};

export type ProjectGlossaryType = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ProjectIntegrationInput = {
  credential?: InputMaybe<IntegrationCredentialsInput>;
  environment?: InputMaybe<ProjectEnvironmentChoice>;
  id?: InputMaybe<Scalars['Int']>;
  keys?: InputMaybe<Array<IntegrationKeyInput>>;
  name: Scalars['String'];
  projectId: Scalars['Int'];
};

export type ProjectIntegrationType = {
  credential?: Maybe<IntegrationCredentialsType>;
  environment?: Maybe<ProjectEnvironmentChoice>;
  id: Scalars['Int'];
  keys?: Maybe<Array<IntegrationKeyType>>;
  name: Scalars['String'];
  projectId: Scalars['Int'];
};

export type ProjectMemberInput = {
  currentTeam: Scalars['Boolean'];
  projectId: Scalars['Int'];
  slackChannels?: InputMaybe<Array<Scalars['Int']>>;
  userId: Scalars['Int'];
};

export type ProjectMemberListType = {
  currentTeam: Array<ProjectMemberType>;
  otherContrubutors: Array<ProjectMemberType>;
};

export type ProjectMemberType = {
  currentTeam: Scalars['Boolean'];
  endDate?: Maybe<Scalars['DateTime']>;
  project: ProjectType;
  startDate: Scalars['DateTime'];
  user: ProfileType;
};

export type ProjectMemberTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<ProjectMemberType>;
};

export enum ProjectPhaseChoice {
  DESIGN = 'DESIGN',
  DEVELOPMENT = 'DEVELOPMENT',
  HANDOVER = 'HANDOVER',
  PRE_SIGNED = 'PRE_SIGNED',
  RELEASED = 'RELEASED',
  SIGNED = 'SIGNED',
  SUPPORT = 'SUPPORT',
}

export type ProjectPreviewType = {
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<ProfileType>;
  id: Scalars['Int'];
  inTeam: Scalars['Boolean'];
  name: Scalars['String'];
};

export type ProjectRepositoryType = {
  projectInGit: Scalars['Boolean'];
  projectRepositories?: Maybe<Array<RepositoryType>>;
};

export type ProjectSlackInput = {
  channelId?: InputMaybe<Scalars['String']>;
  channelTemplate: SlackChannelTemplateInput;
  projectId: Scalars['Int'];
};

export type ProjectSlackType = {
  channelId?: Maybe<Scalars['String']>;
  channelTemplate?: Maybe<Scalars['String']>;
  channelUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  template?: Maybe<SlackChannelTemplateType>;
};

export type ProjectStatusType = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ProjectStatusTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<ProjectStatusType>;
};

export enum ProjectTeamChoice {
  CURRENT = 'CURRENT',
  OTHER = 'OTHER',
}

export type ProjectType = {
  PM?: Maybe<Array<ProfileType>>;
  clientTeam?: Maybe<Array<ClientType>>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<ProfileType>;
  design?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  gitGroupId?: Maybe<Scalars['String']>;
  gitSlug?: Maybe<Scalars['String']>;
  gitUrl?: Maybe<Scalars['String']>;
  hoursEstimated?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  phase?: Maybe<ProjectPhaseChoice>;
  platforms?: Maybe<Array<PlatformType>>;
  roadmap?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  status?: Maybe<ProjectStatusType>;
};

export type ProjectTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<ProjectType>;
};

export type ProjectUpdateInput = {
  clientTeam?: InputMaybe<Array<ClientInput>>;
  design?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  gitPlatform?: InputMaybe<GitPlatformEnum>;
  hoursEstimated?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  phase?: InputMaybe<ProjectPhaseChoice>;
  platforms?: InputMaybe<Array<Scalars['Int']>>;
  roadmap?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  statusId?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  /** Getting boilerplates */
  boilerplateList: Array<BoilerplateType>;
  /** Getting list of users' departments */
  departmentsList: Array<DepartmentType>;
  /** Getting list of document categories */
  documentCategoryList: Array<DocumentCategoryType>;
  /** Getting list of client documents */
  documentClientList: DocumentTypePagination;
  /** Getting list of internal documents */
  documentInternalList: DocumentTypePagination;
  /** Getting list of document templates */
  documentTemplateList: Array<DocumentTemplateType>;
  /** Getting list of user documents */
  documentUserList: DocumentTypePagination;
  /** Getting git initial user by id */
  gitInitialUserDetails: GitInitialUserType;
  /** Getting git initial user list */
  gitInitialUserList: GitInitialUserTypePagination;
  /** Getting list of logs */
  logList: LogTypePagination;
  /** Getting authenticated user */
  me: ProfileType;
  /** Getting list of notifications */
  notificationList: NotificationTypePagination;
  /** Getting list of roles and permissions */
  permissionsList: Array<PermissionType>;
  /** Getting platform list */
  platformList: PlatformTypePagination;
  /** Getting project by id */
  project: ProjectType;
  /** Getting documents for project by id */
  projectDocumentList: DocumentTypePagination;
  /** Getting environments for project by id */
  projectEnvironmentList: Array<ProjectEnvironmentType>;
  /** Getting glossary list of projects */
  projectGlossaryList: Array<ProjectGlossaryType>;
  /** Getting integrations for project by id */
  projectIntegrationList: Array<ProjectIntegrationType>;
  /** Getting project integration page by id */
  projectIntegrationPage: PorjectIntegrationsPage;
  /** Getting history for project by id */
  projectLogList: LogTypePagination;
  /** Getting members for project by id */
  projectMemberList: ProjectMemberListType;
  /** Getting project preview by id */
  projectPreview: ProjectPreviewType;
  /** Getting repositories for project by id */
  projectRepositoryList: ProjectRepositoryType;
  /** Getting project's statuses list */
  projectStatusesList: ProjectStatusTypePagination;
  /** Getting list of projects */
  projectsList: ProjectTypePagination;
  /** Getting repository */
  repository: RepositoryType;
  /** Getting glossary list of repository */
  repositoryGlossaryList: Array<RepositoryGlossaryType>;
  /** Getting repositories */
  repositoryList: RepositoryTypePagination;
  /** Getting repository participants */
  repositoryParticipantList: RepositoryParticipantTypePagination;
  /** Getting repository preview */
  repositoryPreview: RepositoryPreviewType;
  /** Getting request by id */
  requestDetails: RequestType;
  /** Getting list of requests */
  requestList: RequestTypePagination;
  /** Getting list of users' roles */
  rolesList: Array<RoleType>;
  /** Getting Slack channel template by id */
  slackTemplate: SlackChannelTemplateType;
  /** Getting Slack channel templates list */
  slackTemplateList: Array<SlackChannelTemplateType>;
  /** Getting technologies list */
  technologyList: TechnologyTypePagination;
  /** Getting user by id */
  userDetails: UserType;
  /** Getting glossary list of users */
  userGlossaryList: Array<UserGlossaryType>;
  /** Getting project by user */
  userProjects: ProjectMemberTypePagination;
  /** Getting list of users */
  usersList: UserTypePagination;
};

export type QueryBoilerplateListArgs = {
  filters?: InputMaybe<BoilerplateFilter>;
};

export type QueryDocumentClientListArgs = {
  filters?: InputMaybe<DocumentFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<DocumentSortFieldInput>>;
};

export type QueryDocumentInternalListArgs = {
  filters?: InputMaybe<DocumentFilter>;
  pagination?: InputMaybe<PaginationInput>;
  search?: Scalars['String'];
  sort?: InputMaybe<Array<DocumentSortFieldInput>>;
};

export type QueryDocumentUserListArgs = {
  filters?: InputMaybe<DocumentFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<DocumentSortFieldInput>>;
};

export type QueryGitInitialUserDetailsArgs = {
  data: GitInitialUserId;
};

export type QueryGitInitialUserListArgs = {
  pagination: PaginationInput;
  sort?: InputMaybe<Array<GitInitialUserSortFieldInput>>;
};

export type QueryLogListArgs = {
  filters?: InputMaybe<LogFilter>;
  pagination: PaginationInput;
};

export type QueryNotificationListArgs = {
  pagination: PaginationInput;
};

export type QueryPlatformListArgs = {
  pagination: PaginationInput;
};

export type QueryProjectArgs = {
  data: IdInput;
};

export type QueryProjectDocumentListArgs = {
  filters?: InputMaybe<DocumentFilter>;
  pagination?: InputMaybe<PaginationInput>;
  search?: Scalars['String'];
  sort?: InputMaybe<Array<DocumentSortFieldInput>>;
};

export type QueryProjectEnvironmentListArgs = {
  data: IdInput;
};

export type QueryProjectGlossaryListArgs = {
  filters?: InputMaybe<ProjectFilter>;
};

export type QueryProjectIntegrationListArgs = {
  data: IdInput;
};

export type QueryProjectIntegrationPageArgs = {
  data: IdInput;
};

export type QueryProjectLogListArgs = {
  filters?: InputMaybe<LogFilter>;
  pagination: PaginationInput;
};

export type QueryProjectMemberListArgs = {
  data: IdInput;
};

export type QueryProjectPreviewArgs = {
  data: IdInput;
};

export type QueryProjectRepositoryListArgs = {
  data: IdInput;
};

export type QueryProjectStatusesListArgs = {
  pagination: PaginationInput;
};

export type QueryProjectsListArgs = {
  filters?: InputMaybe<ProjectFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryRepositoryArgs = {
  data: IdInput;
};

export type QueryRepositoryListArgs = {
  filters?: InputMaybe<RepositoryFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryRepositoryParticipantListArgs = {
  filters?: InputMaybe<RepositoryParticipantFilter>;
  pagination: PaginationInput;
};

export type QueryRepositoryPreviewArgs = {
  data: IdInput;
};

export type QueryRequestDetailsArgs = {
  data: IdInput;
};

export type QueryRequestListArgs = {
  filters?: InputMaybe<RequestFilter>;
  pagination: PaginationInput;
  sort?: InputMaybe<Array<RequestSortFieldInput>>;
};

export type QuerySlackTemplateArgs = {
  data: IdInput;
};

export type QueryTechnologyListArgs = {
  pagination: PaginationInput;
};

export type QueryUserDetailsArgs = {
  data: IdInput;
};

export type QueryUserProjectsArgs = {
  data: IdInput;
  filters?: InputMaybe<ProjectFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryUsersListArgs = {
  filters?: InputMaybe<UserFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String'];
};

export enum RepositoryAccessLevelChoice {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
  MAINTAINER = 'MAINTAINER',
}

export type RepositoryCreateInput = {
  awsSecrets?: InputMaybe<Scalars['Boolean']>;
  boilerplateId?: InputMaybe<Scalars['Int']>;
  gitRepoId?: InputMaybe<Scalars['String']>;
  gitSlug?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  projectId: Scalars['Int'];
  technologies?: InputMaybe<Array<Scalars['Int']>>;
  type: RepositoryTypeChoice;
  useTerraform?: InputMaybe<Scalars['Boolean']>;
  withRelay?: InputMaybe<Scalars['Boolean']>;
};

export type RepositoryFilter = {
  createdById?: InputMaybe<Scalars['Int']>;
  platform?: InputMaybe<RepositoryPlatformChoice>;
  projectId?: InputMaybe<Scalars['Int']>;
  technologies?: InputMaybe<Array<Scalars['Int']>>;
  type?: InputMaybe<RepositoryTypeChoice>;
};

export type RepositoryGlossaryType = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type RepositoryParticipantFilter = {
  accessLevel?: InputMaybe<RepositoryAccessLevelChoice>;
  repositoryId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type RepositoryParticipantInput = {
  accessLevel?: InputMaybe<RepositoryAccessLevelChoice>;
  repositoryId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type RepositoryParticipantType = {
  accessLevel: RepositoryAccessLevelChoice;
  repository: RepositoryType;
  user: ProfileType;
};

export type RepositoryParticipantTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<RepositoryParticipantType>;
};

export enum RepositoryPlatformChoice {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
}

export type RepositoryPreviewType = {
  id: Scalars['Int'];
  name: Scalars['String'];
  projectId?: Maybe<Scalars['Int']>;
};

export type RepositorySecretsInput = {
  environment: ProjectEnvironmentChoice;
  key: Scalars['String'];
  repositoryId: Scalars['Int'];
  value?: InputMaybe<Scalars['String']>;
};

export type RepositoryType = {
  boilerplate?: Maybe<BoilerplateType>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<ProfileType>;
  gitRepoId?: Maybe<Scalars['String']>;
  gitSlug?: Maybe<Scalars['String']>;
  gitTerraformRepoId?: Maybe<Scalars['String']>;
  gitTerraformUrl?: Maybe<Scalars['String']>;
  gitUrl?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  project: ProjectType;
  technologies?: Maybe<Array<TechnologyType>>;
  type?: Maybe<RepositoryTypeChoice>;
  useTerraform?: Maybe<Scalars['Boolean']>;
};

export enum RepositoryTypeChoice {
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
}

export type RepositoryTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<RepositoryType>;
};

export type RepositoryUpdateInput = {
  gitSlug?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type RequestCreateInput = {
  accessLevel?: InputMaybe<RepositoryAccessLevelChoice>;
  assignedRoleId: Scalars['Int'];
  assignedToId?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['Date']>;
  environment?: InputMaybe<ProjectEnvironmentChoice>;
  integrationName?: InputMaybe<Scalars['String']>;
  projectId: Scalars['Int'];
  repositoryId?: InputMaybe<Scalars['Int']>;
  repositoryType?: InputMaybe<RepositoryTypeChoice>;
  technologies?: InputMaybe<Array<Scalars['Int']>>;
  type: RequestTypeChoice;
};

export type RequestFilter = {
  assignedRole?: InputMaybe<Scalars['Int']>;
  assignedTo?: InputMaybe<Scalars['Int']>;
  createdBy?: InputMaybe<Scalars['Int']>;
  project?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<RequestStatusChoice>;
  type?: InputMaybe<RequestTypeChoice>;
};

export enum RequestSort {
  ASSIGNED_ROLE = 'assigned_role',
  ASSIGNED_TO = 'assigned_to',
  CREATED_AT = 'created_at',
  CREATED_BY = 'created_by',
  DUE_DATE = 'due_date',
  STATUS = 'status',
  TYPE = 'type',
}

export type RequestSortFieldInput = {
  direction: OrderDirectionChoice;
  field: RequestSort;
};

export enum RequestStatusChoice {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
}

export type RequestType = {
  accessLevel?: Maybe<RepositoryAccessLevelChoice>;
  assignedRole?: Maybe<RoleType>;
  assignedTo?: Maybe<ProfileType>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<ProfileType>;
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['Date']>;
  environment?: Maybe<ProjectEnvironmentChoice>;
  id: Scalars['Int'];
  integrationName?: Maybe<Scalars['String']>;
  project?: Maybe<ProjectType>;
  projectTeam?: Maybe<ProjectTeamChoice>;
  repository?: Maybe<RepositoryType>;
  repositoryType?: Maybe<RepositoryTypeChoice>;
  status: RequestStatusChoice;
  technologies?: Maybe<Array<TechnologyType>>;
  type: RequestTypeChoice;
};

export enum RequestTypeChoice {
  ACCESS_PROJECT = 'ACCESS_PROJECT',
  ACCESS_REPOSITORY = 'ACCESS_REPOSITORY',
  CREATION_ENVIRONMENT = 'CREATION_ENVIRONMENT',
  CREATION_INTEGRATION = 'CREATION_INTEGRATION',
  CREATION_REPOSITORY = 'CREATION_REPOSITORY',
}

export type RequestTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<RequestType>;
};

export type RequestUpdateInput = {
  assignedRoleId?: InputMaybe<Scalars['Int']>;
  assignedToId?: InputMaybe<Scalars['Int']>;
  dueDate?: InputMaybe<Scalars['Date']>;
  id: Scalars['Int'];
  status?: InputMaybe<RequestStatusChoice>;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type RoleType = {
  color?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  permissions: Array<PermissionType>;
  permissionsList: Array<Scalars['String']>;
};

export type SlackChannelTemplateInput = {
  id?: InputMaybe<Scalars['Int']>;
  initialUsers?: InputMaybe<Array<Scalars['Int']>>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  prefix?: InputMaybe<Scalars['String']>;
};

export type SlackChannelTemplateType = {
  id: Scalars['Int'];
  initialUsers?: Maybe<Array<ProfileType>>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  prefix: Scalars['String'];
};

export type TechnologyType = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type TechnologyTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<TechnologyType>;
};

export type UserFilter = {
  departmentId?: InputMaybe<Array<Scalars['Int']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  roleId?: InputMaybe<Array<Scalars['Int']>>;
};

export type UserGlossaryType = {
  fullName: Scalars['String'];
  id: Scalars['Int'];
  photo?: Maybe<FileType>;
};

export type UserInput = {
  address?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  contractType?: InputMaybe<ContractChoice>;
  departmentId?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isSuperuser?: InputMaybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['Upload']>;
  roleId?: InputMaybe<Scalars['Int']>;
};

export type UserType = {
  address?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  bitbucketId?: Maybe<Scalars['String']>;
  contractType?: Maybe<ContractChoice>;
  department?: Maybe<DepartmentType>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  isActive?: Maybe<Scalars['Boolean']>;
  isSuperuser?: Maybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  notes?: Maybe<Array<NoteType>>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<FileType>;
  role?: Maybe<RoleType>;
};

export type UserTypePagination = {
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<UserType>;
};

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
