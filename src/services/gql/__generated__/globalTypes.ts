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
  Upload: File;
};

export type ActiveInput = {
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
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

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type ForgotPasswordType = {
  __typename: 'ForgotPasswordType';
  email: Scalars['String'];
  message: Scalars['String'];
};

export enum GitPlatformEnum {
  BITBUCKET = 'BITBUCKET',
  GITLAB = 'GITLAB',
}

export type IdInput = {
  id: Scalars['Int'];
};

export type ImageType = {
  __typename: 'ImageType';
  fileName: Scalars['String'];
  size: Scalars['Int'];
  url: Scalars['String'];
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
  /** Project creation or updating by id */
  project: ProjectType;
  /** Project deletion */
  projectDelete: MessageType;
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

export type MutationProjectArgs = {
  data: ProjectInput;
};

export type MutationProjectDeleteArgs = {
  data: IdInput;
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

export type ProjectInput = {
  awsLogsSlug?: InputMaybe<Scalars['String']>;
  gitGroupId?: InputMaybe<Scalars['String']>;
  gitPlatform?: InputMaybe<GitPlatformEnum>;
  gitSlug?: InputMaybe<Scalars['String']>;
  gitUrl?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  slackBuildsChannelId?: InputMaybe<Scalars['String']>;
  slackBuildsChannelUrl?: InputMaybe<Scalars['String']>;
  slackChannelId?: InputMaybe<Scalars['String']>;
  slackChannelUrl?: InputMaybe<Scalars['String']>;
  slackErrorsChannelId?: InputMaybe<Scalars['String']>;
  slackErrorsChannelUrl?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusEnum>;
};

export type ProjectType = {
  __typename: 'ProjectType';
  awsLogsSlug?: Maybe<Scalars['String']>;
  createdBy?: Maybe<UserType>;
  gitGroupId?: Maybe<Scalars['String']>;
  gitPlatform?: Maybe<GitPlatformEnum>;
  gitSlug?: Maybe<Scalars['String']>;
  gitUrl?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  slackBuildsChannelId?: Maybe<Scalars['String']>;
  slackBuildsChannelUrl?: Maybe<Scalars['String']>;
  slackChannelId?: Maybe<Scalars['String']>;
  slackChannelUrl?: Maybe<Scalars['String']>;
  slackErrorsChannelId?: Maybe<Scalars['String']>;
  slackErrorsChannelUrl?: Maybe<Scalars['String']>;
  status?: Maybe<StatusEnum>;
};

export type Query = {
  __typename: 'Query';
  /** Getting list of users' departments */
  departmentsList: Array<DepartmentType>;
  /** Getting authenticated user */
  me: ProfileType;
  /** Getting project by id */
  project: ProjectType;
  /** Getting list of projects */
  projectsList: Array<ProjectType>;
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
  DESIGN = 'DESIGN',
  FINISHED = 'FINISHED',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  STOPPED = 'STOPPED',
  SUPPORT = 'SUPPORT',
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
