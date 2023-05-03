import { Icon } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useCallback, useMemo } from 'react';
import { Dropdown, DropdownItem } from 'react-nested-dropdown';

import { RequestStatusChoice } from '~/services/gql/__generated__/globalTypes';
import { FetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';

import { FetchRequestsListDocument, useUpdateRequestMutation } from '../../__generated__/schema';
import { AssignedToType } from '../../types';
import styles from './styles.module.scss';

export enum AssignedToVariant {
  CELL = 'CELL',
  FIELD = 'FIELD',
}

interface Props {
  variant: AssignedToVariant;
  allUsers: Exclude<FetchUserGlossaryListQuery['userGlossaryList']['results'], null | undefined>;
  id: number;
  status: RequestStatusChoice;
  assignedTo: AssignedToType;
}

export const AssignedTo: FC<Props> = ({ variant, allUsers, id, status, assignedTo }) => {
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
            <button
              className="flex items-center gap-[25px]"
              type="button"
              onClick={onClick}
              disabled={isRequestResolved}
            >
              <span className="text-p4 text-gray-2">Assigned to </span>
              <div className="flex gap-3 items-center">
                <Avatar uri={assignedTo?.photo?.url || photoPlaceholder} size={32} />
                <div className="flex flex-col text-left">
                  <p className="text-p4">{assignedTo?.fullName ?? 'No assignee'}</p>
                  <p className="text-p4 text-gray-1">{assignedTo?.email}</p>
                </div>
              </div>
              {!isRequestResolved && (
                <Icon name="down-arrow" className={clsx({ 'rotate-180': isOpen })} size={18} />
              )}
            </button>
          )}
        </Dropdown>
      )}
      {variant === AssignedToVariant.CELL && (
        <Dropdown items={options} containerWidth="14.93rem" className={styles['dropdown']}>
          {({ onClick, isOpen }) => (
            <button
              className="flex items-center gap-2"
              type="button"
              onClick={onClick}
              disabled={isRequestResolved}
            >
              <div className="flex gap-3 items-center">
                <Avatar uri={assignedTo?.photo?.url || photoPlaceholder} size={26} />
                <span>{assignedTo?.fullName ?? 'No assignee'}</span>
              </div>
              {!isRequestResolved && (
                <Icon name="down-arrow" size={18} className={clsx({ 'rotate-180': isOpen })} />
              )}
            </button>
          )}
        </Dropdown>
      )}
    </div>
  );
};
