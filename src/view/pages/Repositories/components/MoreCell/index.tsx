import { getGqlError, useSwitchValue } from '@appello/common';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';

import { FetchRepositoriesDocument, useRemoveRepositoryMutation } from '../../__generated__/schema';
import { RepositoryResultType } from '../../types';

export const MoreCell: FC<CellContext<RepositoryResultType, unknown>> = ({ row }) => {
  const { id, name } = row.original;

  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const [removeRepository] = useRemoveRepositoryMutation();

  const removeCurrentRepository = useCallback(() => {
    return toast.promise(
      removeRepository({
        variables: {
          input: { id },
        },
        refetchQueries: [FetchRepositoriesDocument],
      }),
      {
        loading: 'Deleting repository...',
        success: 'Repository deleted',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while deleting repository: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [id, removeRepository]);

  const options: DropdownItem[] = [
    {
      label: 'Delete repository',
      iconBefore: <Icon name="trash" size={14} />,
      onSelect: openConfirmActionModal,
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
          action="delete"
          close={closeConfirmActionModal}
          isOpen={isConfirmActionModal}
          name={name ?? ''}
          onAccept={removeCurrentRepository}
        />
      )}
    </>
  );
};
