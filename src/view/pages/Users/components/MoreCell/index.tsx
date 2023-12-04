import { useSwitchValue } from '@appello/common';
import { getGqlError } from '@appello/services/dist/gql';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';

import { FetchUsersDocument, useChangeUserStatusMutation } from '../../__generated__/schema';
import { UserResultType } from '../../types';

export const MoreCell: FC<CellContext<UserResultType, unknown>> = ({ row }) => {
  const { isActive, id, fullName } = row.original;

  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const [changeStatus] = useChangeUserStatusMutation();

  const setActiveStatus = useCallback(
    (isActive: boolean) => {
      return toast.promise(
        changeStatus({
          variables: {
            input: { id, isActive },
          },
          refetchQueries: [FetchUsersDocument],
        }),
        {
          loading: 'Changing status...',
          success: 'Status changed',
          error: e => {
            const errors = getGqlError(e?.graphQLErrors);
            return `Error while changing status: ${JSON.stringify(errors)}`;
          },
        },
      );
    },
    [changeStatus, id],
  );

  const options: DropdownItem[] = [
    {
      label: 'Change status',
      iconBefore: <Icon name="connection" size={16} />,
      items: [
        {
          label: 'Active',
          onSelect: () => setActiveStatus(true),
          iconAfter: isActive && <Icon className="text-green" name="check" size={18} />,
        },
        {
          label: 'Inactive',
          onSelect: openConfirmActionModal,
          iconAfter: !isActive && <Icon className="text-green" name="check" size={18} />,
        },
      ],
    },
  ];

  return (
    <>
      <Dropdown containerWidth="14.93rem" items={options}>
        {({ onClick }) => (
          <button type="button" onClick={onClick}>
            <Icon name="menu" size={16} />
          </button>
        )}
      </Dropdown>
      {isConfirmActionModal && (
        <ConfirmActionModal
          action="inactivate"
          close={closeConfirmActionModal}
          description="This person will lose access to the app and all additional services!"
          isOpen={isConfirmActionModal}
          name={fullName}
          onAccept={() => setActiveStatus(false)}
        />
      )}
    </>
  );
};
