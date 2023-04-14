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
  __typename: 'BoilerplateType';
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
  __typename: 'ClientType';
  email: Scalars['String'];
  fullName: Scalars['String'];
  id?: Maybe<Scalars['Int']>;
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
  __typename: 'DepartmentType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type DocumentCategoryType = {
  __typename: 'DocumentCategoryType';
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
  internal?: InputMaybe<Scalars['Boolean']>;
  projectId?: InputMaybe<Scalars['Int']>;
  templateId: Scalars['Int'];
  userId?: InputMaybe<Scalars['Int']>;
};

export type DocumentInput = {
  categoryId?: InputMaybe<Scalars['Int']>;
  file?: InputMaybe<Scalars['Upload']>;
  id?: InputMaybe<Scalars['Int']>;
  internal?: InputMaybe<Scalars['Boolean']>;
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

export type DocumentTemplateFieldType = {
  __typename: 'DocumentTemplateFieldType';
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type DocumentTemplateType = {
  __typename: 'DocumentTemplateType';
  fields?: Maybe<Array<DocumentTemplateFieldType>>;
  id: Scalars['Int'];
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type DocumentType = {
  __typename: 'DocumentType';
  addedBy?: Maybe<UserType>;
  category?: Maybe<DocumentCategoryType>;
  createdAt: Scalars['DateTime'];
  file: ImageType;
  id: Scalars['Int'];
  internal: Scalars['Boolean'];
  project?: Maybe<ProjectType>;
  user?: Maybe<UserType>;
};

export type DocumentTypePagination = {
  __typename: 'DocumentTypePagination';
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
  __typename: 'EnvironmentCredentialsType';
  login: Scalars['String'];
  password: Scalars['String'];
  url: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type ForgotPasswordType = {
  __typename: 'ForgotPasswordType';
  email: Scalars['String'];
  message: Scalars['String'];
};

export type IdInput = {
  id: Scalars['Int'];
};

export type IdNameInput = {
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type ImageType = {
  __typename: 'ImageType';
  fileName: Scalars['String'];
  size: Scalars['Int'];
  url: Scalars['String'];
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
  __typename: 'IntegrationCredentialsType';
  id?: Maybe<Scalars['Int']>;
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
  __typename: 'IntegrationKeyType';
  id?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  value: Scalars['String'];
};

export type LogFilter = {
  createdById?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type LogType = {
  __typename: 'LogType';
  createdAt: Scalars['DateTime'];
  createdBy: UserType;
  id: Scalars['Int'];
  message: Scalars['String'];
};

export type LogTypePagination = {
  __typename: 'LogTypePagination';
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
  __typename: 'LoginSuccessType';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: UserType;
};

export type MessageType = {
  __typename: 'MessageType';
  message: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  /** Update client point contact */
  clientMakePointContact: ClientType;
  /** Create or update document */
  documentCreateUpdate: DocumentType;
  /** Delete document */
  documentDelete: MessageType;
  /** Generate document */
  documentGenerate: Array<DocumentType>;
  /** Sending reset password email */
  forgotPassword: ForgotPasswordType;
  /** Login */
  login: LoginSuccessType;
  /** User updating himself */
  meUpdate: ProfileType;
  /** Change password */
  passwordChange: MessageType;
  /** Update permissions */
  permissionsUpdate: Array<PermissionType>;
  /** Project add member */
  projectAddMember: ProjectMemberType;
  /** Project add slack */
  projectAddSlackChannel: ProjectSlackType;
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

export type MutationDocumentCreateUpdateArgs = {
  data: DocumentInput;
};

export type MutationDocumentDeleteArgs = {
  data: IdInput;
};

export type MutationDocumentGenerateArgs = {
  data: Array<DocumentGenerateInput>;
};

export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationMeUpdateArgs = {
  data: ProfileInput;
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
  __typename: 'NoteType';
  createdBy?: Maybe<ProfileType>;
  id: Scalars['Int'];
  text: Scalars['String'];
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
  __typename: 'PermissionType';
  id: Scalars['Int'];
  name: Scalars['String'];
  roles?: Maybe<Array<RoleType>>;
  rolesList?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
};

export type PlatformType = {
  __typename: 'PlatformType';
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type PlatformTypePagination = {
  __typename: 'PlatformTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<PlatformType>;
};

export type ProfileInput = {
  address?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['Upload']>;
};

export type ProfileType = {
  __typename: 'ProfileType';
  address?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  department?: Maybe<DepartmentType>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<ImageType>;
  role?: Maybe<RoleType>;
};

export type ProjectCreateInput = {
  clientTeam?: InputMaybe<Array<ClientInput>>;
  design?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
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
  __typename: 'ProjectEnvironmentType';
  backendCredentials?: Maybe<EnvironmentCredentialsType>;
  frontendCredentials?: Maybe<EnvironmentCredentialsType>;
  id?: Maybe<Scalars['Int']>;
  name: ProjectEnvironmentChoice;
  projectId: Scalars['Int'];
};

export type ProjectFilter = {
  statusId?: InputMaybe<Scalars['Int']>;
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
  __typename: 'ProjectIntegrationType';
  credential?: Maybe<IntegrationCredentialsType>;
  environment?: Maybe<ProjectEnvironmentChoice>;
  id?: Maybe<Scalars['Int']>;
  keys?: Maybe<Array<IntegrationKeyType>>;
  name: Scalars['String'];
  projectId: Scalars['Int'];
};

export type ProjectMemberInput = {
  currentTeam: Scalars['Boolean'];
  projectId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type ProjectMemberListType = {
  __typename: 'ProjectMemberListType';
  currentTeam: Array<ProjectMemberType>;
  otherContrubutors: Array<ProjectMemberType>;
};

export type ProjectMemberType = {
  __typename: 'ProjectMemberType';
  currentTeam: Scalars['Boolean'];
  endDate?: Maybe<Scalars['DateTime']>;
  project: ProjectType;
  startDate: Scalars['DateTime'];
  user: UserType;
};

export type ProjectMemberTypePagination = {
  __typename: 'ProjectMemberTypePagination';
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
  __typename: 'ProjectPreviewType';
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<UserType>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ProjectSlackInput = {
  channelId?: InputMaybe<Scalars['String']>;
  channelTemplate: SlackChannelTemplateInput;
  projectId: Scalars['Int'];
};

export type ProjectSlackType = {
  __typename: 'ProjectSlackType';
  channelId?: Maybe<Scalars['String']>;
  channelTemplate?: Maybe<Scalars['String']>;
  channelUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  template?: Maybe<SlackChannelTemplateType>;
};

export type ProjectStatusType = {
  __typename: 'ProjectStatusType';
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type ProjectStatusTypePagination = {
  __typename: 'ProjectStatusTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<ProjectStatusType>;
};

export type ProjectType = {
  __typename: 'ProjectType';
  PM?: Maybe<Array<UserType>>;
  clientTeam?: Maybe<Array<ClientType>>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<UserType>;
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
  slackChannels?: Maybe<Array<ProjectSlackType>>;
  startDate?: Maybe<Scalars['Date']>;
  status?: Maybe<ProjectStatusType>;
};

export type ProjectTypePagination = {
  __typename: 'ProjectTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<ProjectType>;
};

export type ProjectUpdateInput = {
  clientTeam?: InputMaybe<Array<ClientInput>>;
  design?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
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
  __typename: 'Query';
  /** Getting boilerplates */
  boilerplateList: Array<BoilerplateType>;
  /** Getting list of users' departments */
  departmentsList: Array<DepartmentType>;
  /** Getting list of document categories */
  documentCategoryList: Array<DocumentCategoryType>;
  /** Getting list of documents */
  documentList: DocumentTypePagination;
  /** Getting list of document templates */
  documentTemplateList: Array<DocumentTemplateType>;
  /** Getting list of logs */
  logList: LogTypePagination;
  /** Getting authenticated user */
  me: ProfileType;
  /** Getting list of roles and permissions */
  permissionsList: Array<PermissionType>;
  /** Getting platform list */
  platformList: PlatformTypePagination;
  /** Getting project by id */
  project: ProjectType;
  /** Getting environments for project by id */
  projectEnvironmentList: Array<ProjectEnvironmentType>;
  /** Getting integrations for project by id */
  projectIntegrationList: Array<ProjectIntegrationType>;
  /** Getting members for project by id */
  projectMemberList: ProjectMemberListType;
  /** Getting project preview by id */
  projectPreview: ProjectPreviewType;
  /** Getting repositories for project by id */
  projectRepositoryList: Array<RepositoryType>;
  /** Getting project's statuses list */
  projectStatusesList: ProjectStatusTypePagination;
  /** Getting list of projects */
  projectsList: ProjectTypePagination;
  /** Getting repository */
  repository: RepositoryType;
  /** Getting repositories */
  repositoryList: RepositoryTypePagination;
  /** Getting repository participants */
  repositoryParticipantList: RepositoryParticipantTypePagination;
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
  /** Getting project by user */
  userProjects: ProjectMemberTypePagination;
  /** Getting list of users */
  usersList: UserTypePagination;
};

export type QueryBoilerplateListArgs = {
  filters?: InputMaybe<BoilerplateFilter>;
};

export type QueryDocumentListArgs = {
  filters?: InputMaybe<DocumentFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<DocumentSortFieldInput>>;
};

export type QueryLogListArgs = {
  filters?: InputMaybe<LogFilter>;
  pagination: PaginationInput;
};

export type QueryPlatformListArgs = {
  pagination: PaginationInput;
};

export type QueryProjectArgs = {
  data: IdInput;
};

export type QueryProjectEnvironmentListArgs = {
  data: IdInput;
};

export type QueryProjectIntegrationListArgs = {
  data: IdInput;
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

export type QueryRequestListArgs = {
  filters?: InputMaybe<RequestFilter>;
  pagination: PaginationInput;
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
  __typename: 'RepositoryParticipantType';
  accessLevel: RepositoryAccessLevelChoice;
  repository: RepositoryType;
  user: UserType;
};

export type RepositoryParticipantTypePagination = {
  __typename: 'RepositoryParticipantTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<RepositoryParticipantType>;
};

export enum RepositoryPlatformChoice {
  DESKTOP = 'DESKTOP',
  MOBILE = 'MOBILE',
}

export type RepositorySecretsInput = {
  environment: ProjectEnvironmentChoice;
  key: Scalars['String'];
  repositoryId: Scalars['Int'];
  value?: InputMaybe<Scalars['String']>;
};

export type RepositoryType = {
  __typename: 'RepositoryType';
  boilerplate?: Maybe<BoilerplateType>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<UserType>;
  gitRepoId?: Maybe<Scalars['String']>;
  gitSlug?: Maybe<Scalars['String']>;
  gitTerraformRepoId?: Maybe<Scalars['String']>;
  gitTerraformUrl?: Maybe<Scalars['String']>;
  gitUrl?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
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
  __typename: 'RepositoryTypePagination';
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
  accessLevel?: InputMaybe<Scalars['String']>;
  assignedRoleId: Scalars['Int'];
  assignedToId?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['Date']>;
  projectId?: InputMaybe<Scalars['Int']>;
  repositoryId?: InputMaybe<Scalars['Int']>;
  type: RequestTypeChoice;
};

export type RequestFilter = {
  createdById?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<RequestStatusChoice>;
  type?: InputMaybe<RequestTypeChoice>;
};

export enum RequestStatusChoice {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
}

export type RequestType = {
  __typename: 'RequestType';
  accessLevel?: Maybe<Scalars['String']>;
  assignedRole: RoleType;
  assignedTo?: Maybe<UserType>;
  createdAt: Scalars['DateTime'];
  createdBy: UserType;
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['Date']>;
  id: Scalars['Int'];
  project?: Maybe<ProjectType>;
  repository?: Maybe<RepositoryType>;
  status: RequestStatusChoice;
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
  __typename: 'RequestTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<RequestType>;
};

export type RequestUpdateInput = {
  dueDate?: InputMaybe<Scalars['Date']>;
  id: Scalars['Int'];
  ssignedRoleId?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<RequestStatusChoice>;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type RoleType = {
  __typename: 'RoleType';
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
  __typename: 'SlackChannelTemplateType';
  id: Scalars['Int'];
  initialUsers?: Maybe<Array<UserType>>;
  isPrivate?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  prefix: Scalars['String'];
};

export type TechnologyType = {
  __typename: 'TechnologyType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type TechnologyTypePagination = {
  __typename: 'TechnologyTypePagination';
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

export type UserInput = {
  address?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['Date']>;
  contractType?: InputMaybe<ContractChoice>;
  departmentId?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isSuperuser?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['Upload']>;
  roleId?: InputMaybe<Scalars['Int']>;
};

export type UserType = {
  __typename: 'UserType';
  address?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  bitbucketId?: Maybe<Scalars['String']>;
  contractType?: Maybe<ContractChoice>;
  department?: Maybe<DepartmentType>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  isSuperuser?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  notes?: Maybe<Array<NoteType>>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<ImageType>;
  role?: Maybe<RoleType>;
};

export type UserTypePagination = {
  __typename: 'UserTypePagination';
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
