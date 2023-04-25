import { Loader } from '@appello/web-ui';
import { TextLink } from '@appello/web-ui';
import { Button, ButtonVariant } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { format } from 'date-fns';
import React, { FC, useCallback } from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { RequestStatusChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { useFetchAllUsersQuery } from '~/view/pages/ProjectDetails/__generated__/schema';

import {
  FetchRequestsListDocument,
  useFetchRequestDetailsQuery,
  useUpdateRequestMutation,
} from '../../__generated__/schema';
import { AssignedTo, AssignedToVariant } from '../AssignedTo';
import { DueDate, DueDateVariant } from '../DueDate';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  requestId: number;
}

export const RequestDetailsModal: FC<Props> = ({ isOpen, close, requestId }) => {
  const canReadRepoDetails = useHasAccess(Permission.READ_REPO_DETAILS);

  const { data: request, loading: isLoadingRequestDetails } = useFetchRequestDetailsQuery({
    variables: {
      data: { id: requestId },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: allUsers } = useFetchAllUsersQuery({
    variables: {
      pagination: {
        limit: 0,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const [updateRequest, { loading: isLoadingUpdateRequest }] = useUpdateRequestMutation();

  const resolveRequest = useCallback(() => {
    updateRequest({
      variables: {
        input: { id: requestId, status: RequestStatusChoice.RESOLVED },
      },
      refetchQueries: [FetchRequestsListDocument],
    });
  }, [requestId, updateRequest]);

  const isRequestResolved = request?.requestDetails.status === RequestStatusChoice.RESOLVED;

  return (
    <Modal
      withCloseButton
      isOpen={isOpen}
      close={close}
      contentClassName="w-[31.46rem]"
      title={
        !isLoadingRequestDetails &&
        request && (
          <div className="flex flex-col">
            <span>{convertUppercaseToReadable(request?.requestDetails.type)} request</span>
            <span className="text-p4 text-gray-2 font-normal">
              {format(new Date(request.requestDetails.createdAt), DateFormat.PP_P)}
            </span>
          </div>
        )
      }
    >
      {isLoadingRequestDetails && (
        <div className="flex items-center h-[500px]">
          <Loader full colorful />
        </div>
      )}
      {!isLoadingRequestDetails && request && (
        <div className="flex flex-col gap-[20px] mt-4">
          <div className="flex items-center gap-[25px]">
            <span className="text-p4 text-gray-2">Created by</span>
            <div className="flex gap-3 items-center">
              <Avatar
                uri={request.requestDetails.createdBy?.photo?.url || photoPlaceholder}
                size={32}
              />
              <div className="flex flex-col">
                <p className="text-p4">{request.requestDetails.createdBy?.fullName}</p>
                <p className="text-p4 text-gray-1">{request.requestDetails.createdBy?.email}</p>
              </div>
            </div>
          </div>
          <AssignedTo
            variant={AssignedToVariant.FIELD}
            allUsers={allUsers?.usersList.results ?? []}
            id={requestId}
            status={request.requestDetails.status}
            assignedTo={request.requestDetails.assignedTo}
          />
          <DueDate
            variant={DueDateVariant.FIELD}
            id={requestId}
            dueDate={request.requestDetails.dueDate ?? ''}
            status={request.requestDetails.status}
          />
          {request.requestDetails.description && (
            <div className="flex flex-col py-5 border-solid border-y border-gray-5">
              <span className="text-p4 text-gray-2">Description</span>
              <span className="text-p3 text-black-2 break-all">
                {request.requestDetails.description}
              </span>
            </div>
          )}
          {request.requestDetails.project && (
            <div className="flex flex-col">
              <span className="text-p4 text-gray-2">Project</span>
              <TextLink
                to={generatePath(ROUTES.PROJECT_DETAILS, {
                  id: request.requestDetails.project.id,
                })}
                className="underline text-p3 text-black-2"
              >
                {request.requestDetails.project.name}
              </TextLink>
            </div>
          )}
          {request.requestDetails.environment && (
            <div className="flex flex-col">
              <span className="text-p4 text-gray-2">Environment</span>
              <span className="text-p3 text-black-2">
                {convertUppercaseToReadable(request?.requestDetails.environment)}
              </span>
            </div>
          )}
          {request.requestDetails.integrationName && (
            <div className="flex flex-col">
              <span className="text-p4 text-gray-2">Name</span>
              <span className="text-p3 text-black-2">
                {request?.requestDetails.integrationName}
              </span>
            </div>
          )}
          {request.requestDetails.repositoryType && (
            <div className="flex flex-col">
              <span className="text-p4 text-gray-2">Type</span>
              <span className="text-p3 text-black-2">
                {convertUppercaseToReadable(request?.requestDetails.repositoryType)}
              </span>
            </div>
          )}
          {request.requestDetails.technologies &&
            request.requestDetails.technologies.length > 0 && (
              <div className="flex flex-col">
                <span className="text-p4 text-gray-2">Technologies</span>
                <div>
                  {request.requestDetails.technologies.map(({ id, name }, index) => [
                    index > 0 && ', ',
                    <span key={id} className="text-p3 leading-none">
                      {name}
                    </span>,
                  ])}
                </div>
              </div>
            )}
          {request.requestDetails.repository && (
            <div className="flex flex-col">
              <span className="text-p4 text-gray-2">Repository</span>
              {canReadRepoDetails ? (
                <TextLink
                  to={generatePath(ROUTES.REPOSITORY_DETAILS, {
                    id: request.requestDetails.repository.id,
                  })}
                  className="underline text-p3 text-black-2"
                >
                  {request.requestDetails.repository.name}
                </TextLink>
              ) : (
                <span className="text-p3 text-black-2">
                  {request.requestDetails.repository.name}
                </span>
              )}
            </div>
          )}
          {request.requestDetails.accessLevel && (
            <div className="flex flex-col">
              <span className="text-p4 text-gray-2">Access level</span>
              <span className="text-p3 text-black-2">
                {convertUppercaseToReadable(request.requestDetails.accessLevel)}
              </span>
            </div>
          )}
          <Button
            variant={ButtonVariant.PRIMARY}
            onClick={resolveRequest}
            label={isRequestResolved ? 'Resolved' : 'Resolve'}
            className="mt-6"
            isLoading={isLoadingUpdateRequest}
            disabled={isRequestResolved}
          />
        </div>
      )}
    </Modal>
  );
};
