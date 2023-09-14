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
  Time: string;
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

export type DateRangeFilter = {
  end?: InputMaybe<Scalars['Date']>;
  start?: InputMaybe<Scalars['Date']>;
};

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
  fields: Array<DocumentGenerateFieldInput>;
  projectId?: InputMaybe<Scalars['Int']>;
  templateId: Scalars['Int'];
  userId?: InputMaybe<Scalars['Int']>;
};

export type DocumentInput = {
  categoryId?: InputMaybe<Scalars['Int']>;
  file: Scalars['Upload'];
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
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
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DocumentTemplateFieldType = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type DocumentTemplateInput = {
  description?: InputMaybe<Scalars['String']>;
  fields: Array<DocumentTemplateFieldInput>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  url: Scalars['String'];
};

export enum DocumentTemplateSort {
  NAME = 'name',
  URL = 'url',
}

export type DocumentTemplateSortFieldInput = {
  direction: OrderDirectionChoice;
  field: DocumentTemplateSort;
};

export type DocumentTemplateType = {
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<DocumentTemplateFieldType>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type DocumentTemplateTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<DocumentTemplateType>;
};

export type DocumentType = {
  addedBy?: Maybe<ProfileType>;
  category?: Maybe<DocumentCategoryType>;
  createdAt: Scalars['DateTime'];
  file: FileType;
  id: Scalars['Int'];
  internal: Scalars['Boolean'];
  name: Scalars['String'];
  project?: Maybe<ProjectType>;
  user?: Maybe<ProfileType>;
};

export type DocumentTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<DocumentType>;
};

export type EnvironmentCredentialsInput = {
  login?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type EnvironmentCredentialsType = {
  id: Scalars['Int'];
  login?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type FileType = {
  key: Scalars['String'];
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
  limit?: Maybe<Scalars['Int']>;
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
  limit?: Maybe<Scalars['Int']>;
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
  user: ProfileType;
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
  documentTemplateCreateUpdate: DocumentTemplateType;
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
  /** Unread all notification */
  notificationUnread: MessageType;
  /** Update notification */
  notificationUpdate: NotificationPaginationType;
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
  /** Add or update project initial user */
  projectInitialUserCreate: ProjectInitialUserType;
  /** Delete project initial user */
  projectInitialUserDelete: MessageType;
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
  /** Project update member */
  projectUpdateMember: ProjectMemberType;
  /** Submit Report */
  reportSubmit: MessageType;
  /** Create Report template */
  reportTemplateCreate: ReportTemplateType;
  /** Delete Report template */
  reportTemplateDelete: MessageType;
  /** Change Report template */
  reportTemplateUpdate: ReportTemplateType;
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
  /** Resend invitation */
  resendInvitation: MessageType;
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
  /** Invite user to Slack channel */
  slackUserInvite: MessageType;
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

export type MutationDocumentTemplateCreateUpdateArgs = {
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
  data: Array<Scalars['Int']>;
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

export type MutationProjectInitialUserCreateArgs = {
  data: ProjectInitialUserId;
};

export type MutationProjectInitialUserDeleteArgs = {
  data: ProjectInitialUserId;
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

export type MutationProjectUpdateMemberArgs = {
  data: ProjectMemberUpdateInput;
};

export type MutationReportSubmitArgs = {
  data: ReportInput;
};

export type MutationReportTemplateCreateArgs = {
  data: ReportTemplateInput;
};

export type MutationReportTemplateDeleteArgs = {
  data: IdInput;
};

export type MutationReportTemplateUpdateArgs = {
  data: ReportTemplateUpdateInput;
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

export type MutationResendInvitationArgs = {
  data: ResendInviteInput;
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type MutationSecretsAddUpdateArgs = {
  data: RepositorySecretsInput;
};

export type MutationSignupArgs = {
  data: UserCreateInput;
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

export type MutationSlackUserInviteArgs = {
  data: SlackUserInviteInput;
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

export type NotificationFilter = {
  isNew?: InputMaybe<Scalars['Boolean']>;
};

export type NotificationPaginationType = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  newCount: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<NotificationType>;
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
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<PlatformType>;
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
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<FileType>;
  photoThumbnail?: Maybe<FileType>;
  role?: Maybe<RoleType>;
  slackUrl?: Maybe<Scalars['String']>;
};

export type ProjectCreateInput = {
  clientTeam?: InputMaybe<Array<ClientInput>>;
  design?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  gitPlatform?: InputMaybe<GitPlatformEnum>;
  hoursEstimated?: InputMaybe<Scalars['Int']>;
  kanbanBoard?: InputMaybe<Scalars['String']>;
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
  title?: InputMaybe<Scalars['String']>;
};

export type ProjectEnvironmentType = {
  backendCredentials?: Maybe<EnvironmentCredentialsType>;
  frontendCredentials?: Maybe<EnvironmentCredentialsType>;
  id: Scalars['Int'];
  name: ProjectEnvironmentChoice;
  projectId: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type ProjectFilter = {
  currentTeam?: InputMaybe<Scalars['Boolean']>;
  hasRepositories?: InputMaybe<Scalars['Boolean']>;
  inGit?: InputMaybe<Scalars['Boolean']>;
  my?: InputMaybe<Scalars['Boolean']>;
  statusId?: InputMaybe<Scalars['Int']>;
};

export type ProjectGitIntegrationInput = {
  id: Scalars['Int'];
};

export type ProjectGlossaryType = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ProjectGlossaryTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<ProjectGlossaryType>;
};

export type ProjectInitialUserId = {
  userId: Scalars['Int'];
};

export enum ProjectInitialUserSort {
  DEPARTMENT = 'department',
  EMAIL = 'email',
  FULLNAME = 'fullName',
}

export type ProjectInitialUserSortFieldInput = {
  direction: OrderDirectionChoice;
  field: ProjectInitialUserSort;
};

export type ProjectInitialUserType = {
  user: ProfileType;
};

export type ProjectInitialUserTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<ProjectInitialUserType>;
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

export type ProjectIntegrationsPage = {
  gitGroupId?: Maybe<Scalars['String']>;
  slackChannels?: Maybe<Array<ProjectSlackType>>;
};

export type ProjectIntegrationsPageFilter = {
  slackCreatedOnly?: InputMaybe<Scalars['Boolean']>;
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
  slackChannels: Array<Scalars['Int']>;
  startDate: Scalars['DateTime'];
  user: ProfileType;
};

export type ProjectMemberTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<ProjectMemberType>;
};

export type ProjectMemberUpdateInput = {
  currentTeam?: InputMaybe<Scalars['Boolean']>;
  projectId: Scalars['Int'];
  slackChannels?: InputMaybe<Array<Scalars['Int']>>;
  userId: Scalars['Int'];
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
  createdBy: ProfileType;
  id: Scalars['Int'];
  inTeam: Scalars['Boolean'];
  name: Scalars['String'];
};

export type ProjectRepositoryType = {
  projectInGit: Scalars['Boolean'];
  projectRepositories?: Maybe<Array<RepositoryType>>;
};

export type ProjectSlackInput = {
  channelTemplate: SlackChannelTemplateInput;
  projectId: Scalars['Int'];
};

export type ProjectSlackType = {
  channelId?: Maybe<Scalars['String']>;
  channelTemplate?: Maybe<Scalars['String']>;
  channelUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  template?: Maybe<SlackChannelTemplateType>;
  templateName?: Maybe<Scalars['String']>;
};

export type ProjectStatsType = {
  daysWorkedTotal?: Maybe<Scalars['Int']>;
  estimatedDays?: Maybe<Scalars['Int']>;
  estimatedHours?: Maybe<Scalars['Int']>;
  hoursTrackedTotal?: Maybe<Scalars['Int']>;
  peopleWorkedTotal?: Maybe<Scalars['Int']>;
  remainingHours?: Maybe<Scalars['Int']>;
};

export type ProjectStatusType = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ProjectStatusTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
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
  daysEstimated?: Maybe<Scalars['Int']>;
  design?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  gitGroupId?: Maybe<Scalars['String']>;
  gitSlug?: Maybe<Scalars['String']>;
  gitUrl?: Maybe<Scalars['String']>;
  hoursEstimated?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  inCurrentTeam?: Maybe<Scalars['Boolean']>;
  kanbanBoard?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  phase?: Maybe<ProjectPhaseChoice>;
  platforms?: Maybe<Array<PlatformType>>;
  reportTemplates?: Maybe<Array<ReportTemplatePreviewType>>;
  roadmap?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  status?: Maybe<ProjectStatusType>;
};

export type ProjectTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
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
  kanbanBoard?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  phase?: InputMaybe<ProjectPhaseChoice>;
  platforms?: InputMaybe<Array<Scalars['Int']>>;
  reportTemplates?: InputMaybe<Array<Scalars['Int']>>;
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
  /** Getting document template by id */
  documentTemplate: DocumentTemplateType;
  /** Getting list of document templates */
  documentTemplateList: DocumentTemplateTypePagination;
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
  notificationList: NotificationPaginationType;
  /** Getting list of roles and permissions */
  permissionsList: Array<PermissionType>;
  /** Getting platform list */
  platformList: PlatformTypePagination;
  /** Getting project by id */
  project: ProjectType;
  /** Getting documents for project by id */
  projectDocumentList: DocumentTypePagination;
  /** Getting environment by id */
  projectEnvironment: ProjectEnvironmentType;
  /** Getting environments for project by id */
  projectEnvironmentList: Array<ProjectEnvironmentType>;
  /** Getting glossary list of projects */
  projectGlossaryList: ProjectGlossaryTypePagination;
  /** Getting project initial user list */
  projectInitialUserList: ProjectInitialUserTypePagination;
  /** Getting integrations for project by id */
  projectIntegrationList: Array<ProjectIntegrationType>;
  /** Getting project integration page by id */
  projectIntegrationPage: ProjectIntegrationsPage;
  /** Getting history for project by id */
  projectLogList: LogTypePagination;
  /** Getting members for project by id */
  projectMemberList: ProjectMemberListType;
  /** Getting project preview by id */
  projectPreview: ProjectPreviewType;
  /** Getting repositories for project by id */
  projectRepositoryList: ProjectRepositoryType;
  /** Getting project statistics from Hubstaff */
  projectStats: ProjectStatsType;
  /** Getting project's statuses list */
  projectStatusesList: ProjectStatusTypePagination;
  /** Getting list of projects */
  projectsList: ProjectTypePagination;
  /** Getting report */
  report: ReportType;
  /** Getting report */
  reportList: ReportTypePagination;
  /** Getting report template */
  reportTemplate: ReportTemplateType;
  /** Getting report templates */
  reportTemplateList: ReportTemplateTypePagination;
  /** Getting repository */
  repository: RepositoryType;
  /** Getting glossary list of repository */
  repositoryGlossaryList: RepositoryGlossaryTypePagination;
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
  userGlossaryList: UserGlossaryTypePagination;
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
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<DocumentSortFieldInput>>;
};

export type QueryDocumentInternalListArgs = {
  filters?: InputMaybe<DocumentFilter>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<DocumentSortFieldInput>>;
};

export type QueryDocumentTemplateArgs = {
  data: IdInput;
};

export type QueryDocumentTemplateListArgs = {
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<DocumentTemplateSortFieldInput>>;
};

export type QueryDocumentUserListArgs = {
  filters?: InputMaybe<DocumentFilter>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<DocumentSortFieldInput>>;
};

export type QueryGitInitialUserDetailsArgs = {
  data: GitInitialUserId;
};

export type QueryGitInitialUserListArgs = {
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<GitInitialUserSortFieldInput>>;
};

export type QueryLogListArgs = {
  filters?: InputMaybe<LogFilter>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryNotificationListArgs = {
  filters?: InputMaybe<NotificationFilter>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryPlatformListArgs = {
  pagination?: InputMaybe<PaginationInput>;
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

export type QueryProjectEnvironmentArgs = {
  data: IdInput;
};

export type QueryProjectEnvironmentListArgs = {
  data: IdInput;
};

export type QueryProjectGlossaryListArgs = {
  filters?: InputMaybe<ProjectFilter>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryProjectInitialUserListArgs = {
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<ProjectInitialUserSortFieldInput>>;
};

export type QueryProjectIntegrationListArgs = {
  data: IdInput;
};

export type QueryProjectIntegrationPageArgs = {
  data: IdInput;
  filters?: InputMaybe<ProjectIntegrationsPageFilter>;
};

export type QueryProjectLogListArgs = {
  filters?: InputMaybe<LogFilter>;
  pagination?: InputMaybe<PaginationInput>;
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

export type QueryProjectStatsArgs = {
  data: IdInput;
};

export type QueryProjectStatusesListArgs = {
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryProjectsListArgs = {
  filters?: InputMaybe<ProjectFilter>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryReportArgs = {
  data: IdInput;
};

export type QueryReportListArgs = {
  filters?: InputMaybe<ReportFilter>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryReportTemplateArgs = {
  data: IdInput;
};

export type QueryReportTemplateListArgs = {
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<ReportTemplateSortFieldInput>>;
};

export type QueryRepositoryArgs = {
  data: IdInput;
};

export type QueryRepositoryGlossaryListArgs = {
  filters?: InputMaybe<RepositoryFilter>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryRepositoryListArgs = {
  filters?: InputMaybe<RepositoryFilter>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryRepositoryParticipantListArgs = {
  filters?: InputMaybe<RepositoryParticipantFilter>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryRepositoryPreviewArgs = {
  data: IdInput;
};

export type QueryRequestDetailsArgs = {
  data: IdInput;
};

export type QueryRequestListArgs = {
  filters?: InputMaybe<RequestFilter>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<RequestSortFieldInput>>;
};

export type QuerySlackTemplateArgs = {
  data: IdInput;
};

export type QueryTechnologyListArgs = {
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryUserDetailsArgs = {
  data: IdInput;
};

export type QueryUserGlossaryListArgs = {
  filters?: InputMaybe<UserFilter>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryUserProjectsArgs = {
  data: IdInput;
  filters?: InputMaybe<ProjectFilter>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryUsersListArgs = {
  filters?: InputMaybe<UserFilter>;
  pagination?: InputMaybe<PaginationInput>;
  search?: InputMaybe<Scalars['String']>;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String'];
};

export type ReportAnswerInput = {
  checkboxes?: InputMaybe<Array<Scalars['Int']>>;
  date?: InputMaybe<Scalars['Date']>;
  questionId: Scalars['Int'];
  singleChoiceId?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
  yesNo?: InputMaybe<YesOrNoChoice>;
};

export type ReportAnswerType = {
  checkboxes?: Maybe<Array<ReportQuestionOptionType>>;
  checkboxesStr?: Maybe<Array<Scalars['String']>>;
  date?: Maybe<Scalars['Date']>;
  question: ReportQuestionType;
  singleChoice?: Maybe<ReportQuestionOptionType>;
  singleChoiceStr?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  yesNo?: Maybe<YesOrNoChoice>;
};

export enum ReportEmailNotificationChoice {
  AFTER_2_HOURS = 'AFTER_2_HOURS',
  AFTER_4_HOURS = 'AFTER_4_HOURS',
  AFTER_10_HOURS = 'AFTER_10_HOURS',
}

export type ReportFilter = {
  dateRange?: InputMaybe<DateRangeFilter>;
  projectId?: InputMaybe<Scalars['Int']>;
  submittedBy?: InputMaybe<Scalars['Int']>;
};

export type ReportInput = {
  answers: Array<ReportAnswerInput>;
  id: Scalars['Int'];
  submittedAt?: InputMaybe<Scalars['Date']>;
};

export type ReportQuestionInput = {
  id?: InputMaybe<Scalars['Int']>;
  options?: InputMaybe<Array<ReportQuestionOptionInput>>;
  questionText: Scalars['String'];
  showOnOverview?: InputMaybe<Scalars['Boolean']>;
  type: ReportQuestionTypeChoice;
};

export type ReportQuestionOptionInput = {
  id?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};

export type ReportQuestionOptionType = {
  id: Scalars['Int'];
  text: Scalars['String'];
};

export type ReportQuestionType = {
  id: Scalars['Int'];
  options: Array<ReportQuestionOptionType>;
  questionText: Scalars['String'];
  showOnOverview: Scalars['Boolean'];
  type: ReportQuestionTypeChoice;
};

export enum ReportQuestionTypeChoice {
  CHECKBOXES = 'CHECKBOXES',
  DATE = 'DATE',
  FREE_TEXT = 'FREE_TEXT',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  YES_OR_NO = 'YES_OR_NO',
}

export enum ReportRepeatChoice {
  EVERY_2_WEEKS = 'EVERY_2_WEEKS',
  EVERY_3_WEEKS = 'EVERY_3_WEEKS',
  EVERY_WEEK = 'EVERY_WEEK',
}

export type ReportTemplateInput = {
  applyToAllProjects?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  emailNotification?: InputMaybe<ReportEmailNotificationChoice>;
  filledById?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  projects?: InputMaybe<Array<Scalars['Int']>>;
  questions: Array<ReportQuestionInput>;
  repeat?: InputMaybe<ReportRepeatChoice>;
  reportDay?: InputMaybe<WeekDayChoice>;
  sendTo?: InputMaybe<Array<Scalars['Int']>>;
  time?: InputMaybe<Scalars['Time']>;
};

export type ReportTemplatePreviewType = {
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export enum ReportTemplateSort {
  FILLED_BY = 'filled_by',
  NAME = 'name',
}

export type ReportTemplateSortFieldInput = {
  direction: OrderDirectionChoice;
  field: ReportTemplateSort;
};

export type ReportTemplateType = {
  applyToAllProjects?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  emailNotification: ReportEmailNotificationChoice;
  filledBy: RoleType;
  id: Scalars['Int'];
  name: Scalars['String'];
  projects?: Maybe<Array<ProjectType>>;
  questions: Array<ReportQuestionType>;
  repeat: ReportRepeatChoice;
  reportDay: WeekDayChoice;
  sendTo?: Maybe<Array<ProfileType>>;
  time: Scalars['Time'];
};

export type ReportTemplateTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<ReportTemplateType>;
};

export type ReportTemplateUpdateInput = {
  applyToAllProjects?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  emailNotification?: InputMaybe<ReportEmailNotificationChoice>;
  filledById?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  projects?: InputMaybe<Array<Scalars['Int']>>;
  questions?: InputMaybe<Array<ReportQuestionInput>>;
  repeat?: InputMaybe<ReportRepeatChoice>;
  reportDay?: InputMaybe<WeekDayChoice>;
  sendTo?: InputMaybe<Array<Scalars['Int']>>;
  time?: InputMaybe<Scalars['Time']>;
};

export type ReportType = {
  answers?: Maybe<Array<ReportAnswerType>>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  project?: Maybe<ProjectType>;
  questions?: Maybe<Array<ReportQuestionType>>;
  submittedAt?: Maybe<Scalars['Date']>;
  submittedBy?: Maybe<ProfileType>;
};

export type ReportTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<ReportType>;
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
  withExistingRepo?: InputMaybe<Scalars['Boolean']>;
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

export type RepositoryGlossaryTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<RepositoryGlossaryType>;
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
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<RepositoryParticipantType>;
};

export enum RepositoryPlatformChoice {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
}

export type RepositoryPreviewType = {
  id: Scalars['Int'];
  inParticipant?: Maybe<Scalars['Boolean']>;
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
  inParticipant?: Maybe<Scalars['Boolean']>;
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
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<RepositoryType>;
};

export type RepositoryUpdateInput = {
  gitSlug?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  technologies?: InputMaybe<Array<Scalars['Int']>>;
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
  limit?: Maybe<Scalars['Int']>;
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

export type ResendInviteInput = {
  userId: Scalars['Int'];
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

export type SlackUserInviteInput = {
  slackChannel: Scalars['Int'];
  userId: Scalars['Int'];
};

export type TechnologyType = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type TechnologyTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<TechnologyType>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  password: Scalars['String'];
};

export type UserFilter = {
  departmentId?: InputMaybe<Array<Scalars['Int']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  roleId?: InputMaybe<Array<Scalars['Int']>>;
};

export type UserGlossaryType = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  photo?: Maybe<FileType>;
  photoThumbnail?: Maybe<FileType>;
};

export type UserGlossaryTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<UserGlossaryType>;
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
  inviteAccepted: Scalars['Boolean'];
  isActive?: Maybe<Scalars['Boolean']>;
  isSuperuser?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  notes?: Maybe<Array<NoteType>>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<FileType>;
  photoThumbnail?: Maybe<FileType>;
  role?: Maybe<RoleType>;
  slackUrl?: Maybe<Scalars['String']>;
};

export type UserTypePagination = {
  count: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
  results: Array<UserType>;
};

export enum WeekDayChoice {
  FRIDAY = 'FRIDAY',
  MONDAY = 'MONDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
  THURSDAY = 'THURSDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
}

export enum YesOrNoChoice {
  NO = 'NO',
  YES = 'YES',
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
