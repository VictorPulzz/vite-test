import { useSwitchValue } from '@appello/common/lib/hooks';
import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';
import {
  FetchProjectEnvironmentsListDocument,
  useRemoveProjectEnvironmentMutation,
} from '~/view/pages/ProjectDetails/__generated__/schema';

import { CreateOrUpdateEnvironmentModal } from '../../../../../CreateOrUpdateEnvironmentModal';

interface Props {
  id: number;
  name: string;
}

export const EnvironmentsListItemMenu: FC<Props> = ({ id, name }) => {
  const {
    value: isCreateOrUpdateEnvironmentModalOpen,
    on: openCreateOrUpdateEnvironmentModal,
    off: closeCreateOrUpdateEnvironmentModal,
  } = useSwitchValue(false);

  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const [removeEnvironment] = useRemoveProjectEnvironmentMutation();

  const removeCurrentEnvironment = useCallback(() => {
    return toast.promise(
      removeEnvironment({
        variables: {
          input: { id },
        },
        refetchQueries: [FetchProjectEnvironmentsListDocument],
      }),
      {
        loading: 'Deleting environment...',
        success: 'Environment deleted',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while deleting environment: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [id, removeEnvironment]);

  const options: DropdownItem[] = [
    {
      label: 'Edit',
      onSelect: openCreateOrUpdateEnvironmentModal,
    },
    {
      label: 'Delete',
      onSelect: openConfirmActionModal,
      className: 'text-red',
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
      {isCreateOrUpdateEnvironmentModalOpen && (
        <CreateOrUpdateEnvironmentModal
          isOpen={isCreateOrUpdateEnvironmentModalOpen}
          close={closeCreateOrUpdateEnvironmentModal}
          environmentId={id}
        />
      )}
      {isConfirmActionModal && (
        <ConfirmActionModal
          name={name}
          action="delete"
          isOpen={isConfirmActionModal}
          close={closeConfirmActionModal}
          onAccept={removeCurrentEnvironment}
        />
      )}
    </>
  );
};
