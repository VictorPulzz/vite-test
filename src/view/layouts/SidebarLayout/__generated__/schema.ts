/* eslint-disable */
import * as Types from '~/services/gql/__generated__/globalTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchNotificationsListQueryVariables = Types.Exact<{
  pagination?: Types.InputMaybe<Types.PaginationInput>;
  filters?: Types.InputMaybe<Types.NotificationFilter>;
}>;

export type FetchNotificationsListQuery = {
  notificationList: {
    newCount: number;
    results: Array<{
      id: number;
      isNew: boolean;
      message: string;
      createdAt: string;
      externalId: number;
      type: Types.NotificationTypeChoice;
    }>;
  };
};

export type UpdateNotificationsListMutationVariables = Types.Exact<{
  input: Array<Types.Scalars['Int']> | Types.Scalars['Int'];
}>;

export type UpdateNotificationsListMutation = {
  notificationUpdate: {
    newCount: number;
    results: Array<{
      id: number;
      isNew: boolean;
      message: string;
      createdAt: string;
      externalId: number;
      type: Types.NotificationTypeChoice;
    }>;
  };
};

export const FetchNotificationsListDocument = gql`
  query FetchNotificationsList($pagination: PaginationInput, $filters: NotificationFilter) {
    notificationList(pagination: $pagination, filters: $filters) {
      results {
        id
        isNew
        message
        createdAt
        externalId
        type
      }
      newCount
    }
  }
`;

/**
 * __useFetchNotificationsListQuery__
 *
 * To run a query within a React component, call `useFetchNotificationsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchNotificationsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchNotificationsListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFetchNotificationsListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FetchNotificationsListQuery,
    FetchNotificationsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FetchNotificationsListQuery, FetchNotificationsListQueryVariables>(
    FetchNotificationsListDocument,
    options,
  );
}
export function useFetchNotificationsListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FetchNotificationsListQuery,
    FetchNotificationsListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FetchNotificationsListQuery, FetchNotificationsListQueryVariables>(
    FetchNotificationsListDocument,
    options,
  );
}
export type FetchNotificationsListQueryHookResult = ReturnType<
  typeof useFetchNotificationsListQuery
>;
export type FetchNotificationsListLazyQueryHookResult = ReturnType<
  typeof useFetchNotificationsListLazyQuery
>;
export type FetchNotificationsListQueryResult = Apollo.QueryResult<
  FetchNotificationsListQuery,
  FetchNotificationsListQueryVariables
>;
export const UpdateNotificationsListDocument = gql`
  mutation UpdateNotificationsList($input: [Int!]!) {
    notificationUpdate(data: $input) {
      results {
        id
        isNew
        message
        createdAt
        externalId
        type
      }
      newCount
    }
  }
`;
export type UpdateNotificationsListMutationFn = Apollo.MutationFunction<
  UpdateNotificationsListMutation,
  UpdateNotificationsListMutationVariables
>;

/**
 * __useUpdateNotificationsListMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationsListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationsListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationsListMutation, { data, loading, error }] = useUpdateNotificationsListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNotificationsListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateNotificationsListMutation,
    UpdateNotificationsListMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateNotificationsListMutation,
    UpdateNotificationsListMutationVariables
  >(UpdateNotificationsListDocument, options);
}
export type UpdateNotificationsListMutationHookResult = ReturnType<
  typeof useUpdateNotificationsListMutation
>;
export type UpdateNotificationsListMutationResult =
  Apollo.MutationResult<UpdateNotificationsListMutation>;
export type UpdateNotificationsListMutationOptions = Apollo.BaseMutationOptions<
  UpdateNotificationsListMutation,
  UpdateNotificationsListMutationVariables
>;
