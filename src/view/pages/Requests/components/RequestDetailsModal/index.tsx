import { Loader } from '@appello/web-ui';
import { TextLink } from '@appello/web-ui';
import { Button, ButtonVariant } from '@appello/web-ui';
import { Modal, ModalProps } from '@appello/web-ui';
import { format } from 'date-fns';
import React, { FC, useCallback } from 'react';
import { generatePath } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { RequestStatusChoice } from '~/services/gql/__generated__/globalTypes';
import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { useAppSelector } from '~/store/hooks';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

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
  const roleId = useAppSelector(state => state.user.profile?.role?.id);

  const { canReadRepoDetails } = useUserPermissions();

  const { data: request, loading: isLoadingRequestDetails } = useFetchRequestDetailsQuery({
    variables: {
      data: { id: requestId },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: allUsers } = useFetchUserGlossaryListQuery({
    variables: {
      filters: { roleId: [Number(roleId)] },
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
      close={close}
      contentClassName="w-[31.46rem]"
      isOpen={isOpen}
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
          <Loader colorful full />
        </div>
      )}
      {!isLoadingRequestDetails && request && (
        <div className="flex flex-col gap-[20px] mt-4">
          <div className="flex items-center gap-[25px]">
            <span className="text-p4 text-gray-2">Created by</span>
            <div className="flex gap-3 items-center">
              <Avatar
                size={32}
                uri={request.requestDetails.createdBy?.photoThumbnail?.url || photoPlaceholder}
              />
              <div className="flex flex-col">
                <p className="text-p4">{request.requestDetails.createdBy?.fullName}</p>
                <p className="text-p4 text-gray-1">{request.requestDetails.createdBy?.email}</p>
              </div>
            </div>
          </div>
          <AssignedTo
            allUsers={allUsers?.userGlossaryList.results ?? []}
            assignedTo={request.requestDetails.assignedTo}
            id={requestId}
            status={request.requestDetails.status}
            variant={AssignedToVariant.FIELD}
          />
          <DueDate
            dueDate={request.requestDetails.dueDate ?? ''}
            id={requestId}
            status={request.requestDetails.status}
            variant={DueDateVariant.FIELD}
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
                className="underline text-p3 text-black-2"
                to={generatePath(ROUTES.PROJECT_DETAILS, {
                  id: request.requestDetails.project.id,
                })}
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
                    <span className="text-p3 leading-none" key={id}>
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
                  className="underline text-p3 text-black-2"
                  to={generatePath(ROUTES.REPOSITORY_DETAILS, {
                    id: request.requestDetails.repository.id,
                  })}
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
          <div className="flex justify-end">
            <Button
              className="mt-6 w-[150px]"
              disabled={isRequestResolved}
              isLoading={isLoadingUpdateRequest}
              label={isRequestResolved ? 'Resolved' : 'Resolve'}
              variant={ButtonVariant.PRIMARY}
              onClick={resolveRequest}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};
