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
  position?: InputMaybe<Scalars['String']>;
};

export type ClientType = {
  __typename: 'ClientType';
  email: Scalars['String'];
  fullName: Scalars['String'];
  id?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
};

export enum ContractChoice {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
}

export type DepartmentType = {
  __typename: 'DepartmentType';
  id: Scalars['Int'];
  name: Scalars['String'];
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
  forgotPassword: ForgotPasswordType;
  /** Login */
  login: LoginSuccessType;
  /** User updating himself */
  meUpdate: ProfileType;
  passwordChange: MessageType;
  /** Project add member */
  projectAddMember: ProjectMemberType;
  /** Project change status */
  projectChangeStatus: ProjectType;
  /** Project creation */
  projectCreateUpdate: ProjectType;
  /** Project deletion */
  projectDelete: MessageType;
  /** Project delete member */
  projectDeleteMember: MessageType;
  /** Project create or update environment */
  projectEnvironmentCreateUpdate: ProjectEnvironmentType;
  /** Project create or update integration */
  projectIntegrationCreateUpdate: ProjectIntegrationType;
  /** Repository creation or update */
  repositoryCreateUpdate: RepositoryType;
  resetPassword: MessageType;
  /** User creation */
  signup: MessageType;
  /** Refreshing of tokens */
  tokenRefresh: LoginSuccessType;
  /** Change user status */
  userChangeStatus: UserType;
  /** User create or updating */
  userCreateUpdate: UserType;
  /** User deletion */
  userDelete: MessageType;
  /** Add user note */
  userNote: NoteType;
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

export type MutationProjectAddMemberArgs = {
  data: ProjectMemberInput;
};

export type MutationProjectChangeStatusArgs = {
  data: ProjectStatusInput;
};

export type MutationProjectCreateUpdateArgs = {
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

export type MutationProjectIntegrationCreateUpdateArgs = {
  data: ProjectIntegrationInput;
};

export type MutationRepositoryCreateUpdateArgs = {
  data: RepositoryInput;
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type MutationSignupArgs = {
  data: LoginInput;
};

export type MutationTokenRefreshArgs = {
  data: RefreshTokenInput;
};

export type MutationUserChangeStatusArgs = {
  data: ActiveInput;
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

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<ImageType>;
};

export type ProjectCreateInput = {
  clientTeam?: InputMaybe<Array<ClientInput>>;
  design?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  hoursEstimated?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  phase: ProjectPhaseChoice;
  roadmap?: InputMaybe<Scalars['String']>;
  startDate: Scalars['Date'];
  status?: InputMaybe<StatusEnum>;
};

export type ProjectEnvironmentInput = {
  backendCredentials?: InputMaybe<EnvironmentCredentialsInput>;
  frontendCredentials?: InputMaybe<EnvironmentCredentialsInput>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  projectId: Scalars['Int'];
};

export type ProjectEnvironmentType = {
  __typename: 'ProjectEnvironmentType';
  backendCredentials?: Maybe<EnvironmentCredentialsType>;
  frontendCredentials?: Maybe<EnvironmentCredentialsType>;
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  projectId: Scalars['Int'];
};

export type ProjectFilter = {
  status?: InputMaybe<StatusEnum>;
};

export type ProjectIntegrationInput = {
  credentials?: InputMaybe<Array<IntegrationCredentialsInput>>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  projectId: Scalars['Int'];
};

export type ProjectIntegrationType = {
  __typename: 'ProjectIntegrationType';
  credentials?: Maybe<Array<IntegrationCredentialsType>>;
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  projectId: Scalars['Int'];
};

export type ProjectMemberInput = {
  currentTeam?: InputMaybe<Scalars['Boolean']>;
  projectId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type ProjectMemberListType = {
  __typename: 'ProjectMemberListType';
  currentTeam: Array<UserType>;
  otherContrubutors: Array<UserType>;
};

export type ProjectMemberType = {
  __typename: 'ProjectMemberType';
  currentTeam: Scalars['Boolean'];
  project: ProjectType;
  user: UserType;
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

export type ProjectStatusInput = {
  id: Scalars['Int'];
  status: StatusEnum;
};

export type ProjectType = {
  __typename: 'ProjectType';
  PM?: Maybe<Array<UserType>>;
  clientTeam?: Maybe<Array<ClientType>>;
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<UserType>;
  design?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  hoursEstimated?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  phase: ProjectPhaseChoice;
  roadmap?: Maybe<Scalars['String']>;
  startDate: Scalars['Date'];
  status?: Maybe<StatusEnum>;
};

export type ProjectTypePagination = {
  __typename: 'ProjectTypePagination';
  count: Scalars['Int'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  results: Array<ProjectType>;
};

export type Query = {
  __typename: 'Query';
  /** Getting list of users' departments */
  departmentsList: Array<DepartmentType>;
  /** Getting authenticated user */
  me: ProfileType;
  /** Getting project by id */
  project: ProjectType;
  /** Getting environments for project by id */
  projectEnvironmentList: Array<ProjectEnvironmentType>;
  /** Getting integrations for project by id */
  projectIntegrationList: Array<ProjectIntegrationType>;
  /** Getting member for project by id */
  projectMemberList: ProjectMemberListType;
  /** Getting repositories for project by id */
  projectRepositoryList: Array<RepositoryType>;
  /** Getting list of projects */
  projectsList: ProjectTypePagination;
  /** Getting list of users' roles */
  rolesList: Array<RoleType>;
  /** Getting user by id */
  userDetails: UserType;
  /** Getting list of users */
  usersList: UserTypePagination;
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

export type QueryProjectRepositoryListArgs = {
  data: IdInput;
};

export type QueryProjectsListArgs = {
  filters?: InputMaybe<ProjectFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type QueryUserDetailsArgs = {
  data: IdInput;
};

export type QueryUsersListArgs = {
  filters?: InputMaybe<UserFilter>;
  pagination: PaginationInput;
  search?: InputMaybe<Scalars['String']>;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String'];
};

export type RepositoryInput = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  platform?: InputMaybe<RepositoryPlatformChoice>;
  projectId: Scalars['Int'];
  type?: InputMaybe<RepositoryTypeChoice>;
};

export enum RepositoryPlatformChoice {
  MOBILE = 'MOBILE',
  WEB = 'WEB',
}

export type RepositoryType = {
  __typename: 'RepositoryType';
  createdAt: Scalars['DateTime'];
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  platform?: Maybe<RepositoryPlatformChoice>;
  projectId: Scalars['Int'];
  type?: Maybe<RepositoryTypeChoice>;
};

export enum RepositoryTypeChoice {
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
}

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type RoleType = {
  __typename: 'RoleType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export enum StatusEnum {
  BLOCKED = 'BLOCKED',
  IN_PROGRESS = 'IN_PROGRESS',
  STOPPED = 'STOPPED',
  WAITING = 'WAITING',
}

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
  contractType?: Maybe<ContractChoice>;
  department?: Maybe<DepartmentType>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
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
