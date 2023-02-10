import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { CellContext } from '@tanstack/table-core';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ClientType } from '~/services/gql/__generated__/globalTypes';
import { Icon } from '~/view/ui/components/common/Icon';

import { AddOrEditClientTeamMemberModal } from '../AddOrEditClientTeamMemberModal';

export const MoreCell: FC<CellContext<ClientType, unknown>> = ({ row }) => {
  const {
    value: isAddOrEditClientTeamMemberModalOpen,
    on: openAddOrEditClientTeamMemberModal,
    off: closeAddOrEditClientTeamMemberModal,
  } = useSwitchValue(false);

  const { control } = useFormContext();

  const { remove } = useFieldArray({
    control,
    name: 'clientTeamMembers',
  });

  const options: DropdownItem[] = [
    {
      label: 'Edit member',
      iconBefore: <Icon name="edit" size={14} />,
      onSelect: openAddOrEditClientTeamMemberModal,
    },
    {
      label: 'Make point of contact',
      iconBefore: <Icon name="connection" size={14} />,
      onSelect: () => row,
    },
    {
      label: 'Delete member',
      iconBefore: <Icon name="trash" size={14} />,
      className: 'text-red',
      onSelect: () => remove(row.index),
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
      <AddOrEditClientTeamMemberModal
        isOpen={isAddOrEditClientTeamMemberModalOpen}
        close={closeAddOrEditClientTeamMemberModal}
        clientTeamMemberRow={row}
        isEditMode
      />
    </>
  );
};
