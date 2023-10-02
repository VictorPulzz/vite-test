/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchReportTemplatesListQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  sort?: Types.InputMaybe<
    Array<Types.ReportTemplateSortFieldInput> | Types.ReportTemplateSortFieldInput
  >;
}>;

export type FetchReportTemplatesListQuery = {
  reportTemplateList: {
    count: number;
    results: Array<{ id: number; name: string; description: string; filledBy: { name: string } }>;
  };
};

export type FetchReportTemplateInfoQueryVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type FetchReportTemplateInfoQuery = {
  reportTemplate: {
    id: number;
    name: string;
    description: string;
    reportDay: Types.WeekDayChoice;
    time: string;
    repeat: Types.ReportRepeatChoice;
    emailNotification: Types.ReportEmailNotificationChoice;
    applyToAllProjects?: boolean | null;
    filledBy: { id: number };
    sendTo?: Array<{ id: number }> | null;
    questions: Array<{
      id: number;
      type: Types.ReportQuestionTypeChoice;
      questionText: string;
      showOnOverview: boolean;
      options: Array<{ id: number; text: string }>;
    }>;
  };
};

export type CreateReportTemplateMutationVariables = Types.Exact<{
  input: Types.ReportTemplateInput;
}>;

export type CreateReportTemplateMutation = { reportTemplateCreate: { id: number } };

export type UpdateReportTemplateMutationVariables = Types.Exact<{
  input: Types.ReportTemplateUpdateInput;
}>;

export type UpdateReportTemplateMutation = { reportTemplateUpdate: { id: number } };

export type RemoveReportTemplateMutationVariables = Types.Exact<{
  input: Types.IdInput;
}>;

export type RemoveReportTemplateMutation = { reportTemplateDelete: { message: string } };

export const FetchReportTemplatesListDocument = gql`
  query FetchReportTemplatesList(
    $pagination: PaginationInput
    $sort: [ReportTemplateSortFieldInput!]
  ) {
    reportTemplateList(pagination: $pagination, sort: $sort) {
      results {
        id
        name
        description
        filledBy {
          name
        }
      }
      count
    }
  }
`;

/**
 * __useFetchReportTemplatesListQuery__
 *
 * To run a query within a React component, call `useFetchReportTemplatesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchReportTemplatesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchReportTemplatesListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useFetchReportTemplatesListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchReportTemplatesListQuery,
    FetchReportTemplatesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchReportTemplatesListQuery, FetchReportTemplatesListQueryVariables>(
    FetchReportTemplatesListDocument,
    options,
  );
}
export function useFetchReportTemplatesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchReportTemplatesListQuery,
    FetchReportTemplatesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchReportTemplatesListQuery, FetchReportTemplatesListQueryVariables>(
    FetchReportTemplatesListDocument,
    options,
  );
}
export type FetchReportTemplatesListQueryHookResult = ReturnType<
  typeof useFetchReportTemplatesListQuery
>;
export type FetchReportTemplatesListLazyQueryHookResult = ReturnType<
  typeof useFetchReportTemplatesListLazyQuery
>;
export type FetchReportTemplatesListQueryResult = Apollo.QueryResult<
  FetchReportTemplatesListQuery,
  FetchReportTemplatesListQueryVariables
>;
export const FetchReportTemplateInfoDocument = gql`
  query FetchReportTemplateInfo($input: IDInput!) {
    reportTemplate(data: $input) {
      id
      name
      description
      filledBy {
        id
      }
      reportDay
      time
      repeat
      emailNotification
      sendTo {
        id
      }
      applyToAllProjects
      questions {
        id
        type
        questionText
        options {
          id
          text
        }
        showOnOverview
      }
    }
  }
`;

/**
 * __useFetchReportTemplateInfoQuery__
 *
 * To run a query within a React component, call `useFetchReportTemplateInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchReportTemplateInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchReportTemplateInfoQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFetchReportTemplateInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    FetchReportTemplateInfoQuery,
    FetchReportTemplateInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchReportTemplateInfoQuery, FetchReportTemplateInfoQueryVariables>(
    FetchReportTemplateInfoDocument,
    options,
  );
}
export function useFetchReportTemplateInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchReportTemplateInfoQuery,
    FetchReportTemplateInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchReportTemplateInfoQuery, FetchReportTemplateInfoQueryVariables>(
    FetchReportTemplateInfoDocument,
    options,
  );
}
export type FetchReportTemplateInfoQueryHookResult = ReturnType<
  typeof useFetchReportTemplateInfoQuery
>;
export type FetchReportTemplateInfoLazyQueryHookResult = ReturnType<
  typeof useFetchReportTemplateInfoLazyQuery
>;
export type FetchReportTemplateInfoQueryResult = Apollo.QueryResult<
  FetchReportTemplateInfoQuery,
  FetchReportTemplateInfoQueryVariables
>;
export const CreateReportTemplateDocument = gql`
  mutation CreateReportTemplate($input: ReportTemplateInput!) {
    reportTemplateCreate(data: $input) {
      id
    }
  }
`;
export type CreateReportTemplateMutationFn = Apollo.MutationFunction<
  CreateReportTemplateMutation,
  CreateReportTemplateMutationVariables
>;

/**
 * __useCreateReportTemplateMutation__
 *
 * To run a mutation, you first call `useCreateReportTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportTemplateMutation, { data, loading, error }] = useCreateReportTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReportTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateReportTemplateMutation,
    CreateReportTemplateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateReportTemplateMutation, CreateReportTemplateMutationVariables>(
    CreateReportTemplateDocument,
    options,
  );
}
export type CreateReportTemplateMutationHookResult = ReturnType<
  typeof useCreateReportTemplateMutation
>;
export type CreateReportTemplateMutationResult =
  Apollo.MutationResult<CreateReportTemplateMutation>;
export type CreateReportTemplateMutationOptions = Apollo.BaseMutationOptions<
  CreateReportTemplateMutation,
  CreateReportTemplateMutationVariables
>;
export const UpdateReportTemplateDocument = gql`
  mutation UpdateReportTemplate($input: ReportTemplateUpdateInput!) {
    reportTemplateUpdate(data: $input) {
      id
    }
  }
`;
export type UpdateReportTemplateMutationFn = Apollo.MutationFunction<
  UpdateReportTemplateMutation,
  UpdateReportTemplateMutationVariables
>;

/**
 * __useUpdateReportTemplateMutation__
 *
 * To run a mutation, you first call `useUpdateReportTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReportTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReportTemplateMutation, { data, loading, error }] = useUpdateReportTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateReportTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateReportTemplateMutation,
    UpdateReportTemplateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateReportTemplateMutation, UpdateReportTemplateMutationVariables>(
    UpdateReportTemplateDocument,
    options,
  );
}
export type UpdateReportTemplateMutationHookResult = ReturnType<
  typeof useUpdateReportTemplateMutation
>;
export type UpdateReportTemplateMutationResult =
  Apollo.MutationResult<UpdateReportTemplateMutation>;
export type UpdateReportTemplateMutationOptions = Apollo.BaseMutationOptions<
  UpdateReportTemplateMutation,
  UpdateReportTemplateMutationVariables
>;
export const RemoveReportTemplateDocument = gql`
  mutation RemoveReportTemplate($input: IDInput!) {
    reportTemplateDelete(data: $input) {
      message
    }
  }
`;
export type RemoveReportTemplateMutationFn = Apollo.MutationFunction<
  RemoveReportTemplateMutation,
  RemoveReportTemplateMutationVariables
>;

/**
 * __useRemoveReportTemplateMutation__
 *
 * To run a mutation, you first call `useRemoveReportTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveReportTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeReportTemplateMutation, { data, loading, error }] = useRemoveReportTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveReportTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveReportTemplateMutation,
    RemoveReportTemplateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveReportTemplateMutation, RemoveReportTemplateMutationVariables>(
    RemoveReportTemplateDocument,
    options,
  );
}
export type RemoveReportTemplateMutationHookResult = ReturnType<
  typeof useRemoveReportTemplateMutation
>;
export type RemoveReportTemplateMutationResult =
  Apollo.MutationResult<RemoveReportTemplateMutation>;
export type RemoveReportTemplateMutationOptions = Apollo.BaseMutationOptions<
  RemoveReportTemplateMutation,
  RemoveReportTemplateMutationVariables
>;
