import { useSwitchValue } from '@appello/common/lib/hooks';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import React, { FC } from 'react';

import { CreateOrUpdateEnvironmentModal } from '../../../../../CreateOrUpdateEnvironmentModal';
import { DeleteEnvironmentModal } from './components/DeleteEnvironmentModal';

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
    value: isDeleteEnvironmentModalOpen,
    on: openDeleteEnvironmentModal,
    off: closeDeleteEnvironmentModal,
  } = useSwitchValue(false);

  const options: DropdownItem[] = [
    {
      label: 'Edit',
      onSelect: openCreateOrUpdateEnvironmentModal,
    },
    {
      label: 'Delete',
      onSelect: openDeleteEnvironmentModal,
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
      {isDeleteEnvironmentModalOpen && (
        <DeleteEnvironmentModal
          isOpen={isDeleteEnvironmentModalOpen}
          close={closeDeleteEnvironmentModal}
          id={id}
          name={name}
        />
      )}
    </>
  );
};
