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
};

export type DepartmentType = {
  __typename: 'DepartmentType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type EmployeeInput = {
  awsUsername?: InputMaybe<Scalars['String']>;
  bitbucketId?: InputMaybe<Scalars['String']>;
  department?: InputMaybe<IdInput>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gitlabUserId?: InputMaybe<Scalars['String']>;
  gitlabUsername?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  isDeveloper?: InputMaybe<Scalars['Boolean']>;
  isGitAdmin?: InputMaybe<Scalars['Boolean']>;
  isSlackAdmin?: InputMaybe<Scalars['Boolean']>;
  isSuperuser?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  passwordToken?: InputMaybe<Scalars['String']>;
  slackUserId?: InputMaybe<Scalars['String']>;
};

export type EmployeeType = {
  __typename: 'EmployeeType';
  awsUsername?: Maybe<Scalars['String']>;
  bitbucketId?: Maybe<Scalars['String']>;
  department?: Maybe<DepartmentType>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  gitlabUserId?: Maybe<Scalars['String']>;
  gitlabUsername?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isActive?: Maybe<Scalars['Boolean']>;
  isDeveloper?: Maybe<Scalars['Boolean']>;
  isGitAdmin?: Maybe<Scalars['Boolean']>;
  isSlackAdmin?: Maybe<Scalars['Boolean']>;
  isSuperuser?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  passwordToken?: Maybe<Scalars['String']>;
  slackUserId?: Maybe<Scalars['String']>;
};

export enum GitPlatformEnum {
  BITBUCKET = 'BITBUCKET',
  GITLAB = 'GITLAB',
}

export type IdInput = {
  id: Scalars['Int'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginSuccessType = {
  __typename: 'LoginSuccessType';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: EmployeeType;
};

export type MessageType = {
  __typename: 'MessageType';
  message: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  /** Employee deletion */
  employeeDelete: MessageType;
  /** Employee updating */
  employeeUpdate: EmployeeType;
  /** Login */
  login: LoginSuccessType;
  /** Project creation or updating by id */
  project: ProjectType;
  /** Project deletion */
  projectDelete: MessageType;
  /** Employee creation */
  signup: MessageType;
  /** Refreshing of tokens */
  tokenRefresh: LoginSuccessType;
};

export type MutationEmployeeUpdateArgs = {
  data: EmployeeInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationProjectArgs = {
  data: ProjectInput;
};

export type MutationProjectDeleteArgs = {
  data: IdInput;
};

export type MutationSignupArgs = {
  data: LoginInput;
};

export type MutationTokenRefreshArgs = {
  data: RefreshTokenInput;
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
  createdBy: EmployeeType;
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
  /** Getting list of employees' roles */
  departmentsList: Array<DepartmentType>;
  /** Getting list of employees */
  employeesList: Array<EmployeeType>;
  /** Getting authenticated user */
  me: EmployeeType;
  /** Getting project by id */
  project: ProjectType;
  /** Getting list of projects */
  projectsList: Array<ProjectType>;
};

export type QueryProjectArgs = {
  data: IdInput;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String'];
};

export enum StatusEnum {
  DESIGN = 'DESIGN',
  FINISHED = 'FINISHED',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  STOPPED = 'STOPPED',
  SUPPORT = 'SUPPORT',
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
