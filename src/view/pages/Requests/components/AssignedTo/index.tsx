import { Icon, TextLink } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useCallback, useMemo } from 'react';
import { Dropdown, DropdownItem } from 'react-nested-dropdown';
import { generatePath } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { RequestStatusChoice } from '~/services/gql/__generated__/globalTypes';
import { FetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';

import {
  FetchRequestDetailsQuery,
  FetchRequestsListDocument,
  useUpdateRequestMutation,
} from '../../__generated__/schema';
import { RequestResultType } from '../../types';
import styles from './styles.module.scss';

export enum AssignedToVariant {
  CELL = 'CELL',
  FIELD = 'FIELD',
}

interface Props {
  variant: AssignedToVariant;
  allUsers: Exclude<FetchUserGlossaryListQuery['userGlossaryList']['results'], null | undefined>;
  canReadUserDetails?: boolean;
  id: number;
  status: RequestStatusChoice;
  assignedTo:
    | FetchRequestDetailsQuery['requestDetails']['assignedTo']
    | RequestResultType['assignedTo'];
}

export const AssignedTo: FC<Props> = ({
  variant,
  allUsers,
  canReadUserDetails,
  id,
  status,
  assignedTo,
}) => {
  const [updateRequest] = useUpdateRequestMutation();

  const updateAssignedToRequest = useCallback(
    (assignedUserId: number) => {
      updateRequest({
        variables: {
          input: { id, assignedToId: assignedUserId },
        },
        refetchQueries: [FetchRequestsListDocument],
      });
    },
    [id, updateRequest],
  );

  const options: DropdownItem[] = useMemo(
    () =>
      allUsers
        ? allUsers.map(user => ({
            label: user.fullName,
            onSelect: () => updateAssignedToRequest(user.id),
          }))
        : [],
    [allUsers, updateAssignedToRequest],
  );

  const isRequestResolved = status === RequestStatusChoice.RESOLVED;

  return (
    <div>
      {variant === AssignedToVariant.FIELD && (
        <Dropdown items={options} containerWidth="14.93rem" className={styles['dropdown']}>
          {({ onClick, isOpen }) => (
            <div className="flex items-center gap-[25px]">
              <span className="text-p4 text-gray-2">Assigned to </span>
              <div className="flex gap-3 items-center">
                <Avatar uri={assignedTo?.photo?.url || photoPlaceholder} size={32} />
                <div className="flex flex-col">
                  <p className="text-p4">{assignedTo?.fullName ?? 'No assignee'}</p>
                  <p className="text-p4 text-gray-1">{assignedTo?.email}</p>
                </div>
              </div>
              <button type="button" onClick={onClick}>
                {!isRequestResolved && (
                  <Icon name="down-arrow" className={clsx({ 'rotate-180': isOpen })} size={18} />
                )}
              </button>
            </div>
          )}
        </Dropdown>
      )}
      {variant === AssignedToVariant.CELL && (
        <Dropdown items={options} containerWidth="14.93rem" className={styles['dropdown']}>
          {({ onClick, isOpen }) => (
            <div className="flex items-center gap-2">
              <div className="flex gap-3 items-center">
                <Avatar uri={assignedTo?.photo?.url || photoPlaceholder} size={26} />
                {canReadUserDetails ? (
                  <div>
                    {assignedTo ? (
                      <TextLink
                        to={generatePath(ROUTES.USER_DETAILS, { id: assignedTo.id })}
                        className="underline"
                      >
                        {assignedTo.fullName}
                      </TextLink>
                    ) : (
                      <span>No assignee</span>
                    )}
                  </div>
                ) : (
                  <span> {assignedTo?.fullName ?? 'No assignee'}</span>
                )}
              </div>
              <button type="button" onClick={onClick}>
                {!isRequestResolved && (
                  <Icon name="down-arrow" size={18} className={clsx({ 'rotate-180': isOpen })} />
                )}
              </button>
            </div>
          )}
        </Dropdown>
      )}
    </div>
  );
};
