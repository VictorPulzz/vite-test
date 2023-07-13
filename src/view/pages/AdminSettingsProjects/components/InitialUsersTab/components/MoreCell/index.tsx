import { useSwitchValue } from '@appello/common/lib/hooks';
import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';
import {
  FetchProjectInitialUsersListDocument,
  useRemoveProjectInitialUserMutation,
} from '~/view/pages/AdminSettingsProjects/__generated__/schema';

import { ProjectInitialUsersResultType } from '../../types';

export const MoreCell: FC<CellContext<ProjectInitialUsersResultType, unknown>> = ({ row }) => {
  const { user } = row.original;

  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const [removeUser] = useRemoveProjectInitialUserMutation();

  const remove = useCallback(() => {
    return toast.promise(
      removeUser({
        variables: {
          input: { userId: user.id },
        },
        refetchQueries: [FetchProjectInitialUsersListDocument],
      }),
      {
        loading: 'Deleting user from list...',
        success: 'User deleted from list',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while deleting user: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [removeUser, user.id]);

  const options: DropdownItem[] = [
    {
      label: 'Delete',
      iconBefore: <Icon name="trash" size={16} />,
      className: 'text-red',
      onSelect: openConfirmActionModal,
    },
  ];

  return (
    <>
      <Dropdown items={options} containerWidth="14.93rem">
        {({ onClick }) => (
          <button type="button" onClick={onClick}>
            <Icon name="menu" size={16} />
          </button>
        )}
      </Dropdown>
      {isConfirmActionModal && (
        <ConfirmActionModal
          name={user.fullName}
          action="delete"
          isOpen={isConfirmActionModal}
          close={closeConfirmActionModal}
          onAccept={remove}
        />
      )}
    </>
  );
};
