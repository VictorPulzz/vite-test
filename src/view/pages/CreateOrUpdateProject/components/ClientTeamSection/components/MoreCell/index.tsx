import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { ClientType } from '~/services/gql/__generated__/globalTypes';
import { AddOrEditModal } from '~/view/pages/CreateOrUpdateProject/components/ClientTeamSection/components/AddOrEditModal';

export const MoreCell: FC<CellContext<ClientType, unknown>> = ({ row }) => {
  const { pointContact } = row.original;

  const {
    value: isAddOrEditClientTeamMemberModalOpen,
    on: openAddOrEditClientTeamMemberModal,
    off: closeAddOrEditClientTeamMemberModal,
  } = useSwitchValue(false);

  const { control } = useFormContext();

  const { remove, update } = useFieldArray({
    control,
    name: 'clientTeam',
  });

  const togglePointOfContact = useCallback(
    (rowIndex: number) => {
      update(rowIndex, Object.assign(row.original, { pointContact: !pointContact }));
    },
    [pointContact, row.original, update],
  );

  const options: DropdownItem[] = [
    {
      label: 'Edit member',
      iconBefore: <Icon name="edit" size={14} />,
      onSelect: openAddOrEditClientTeamMemberModal,
    },
    {
      label: `${pointContact ? 'Remove' : 'Make'} point of contact`,
      iconBefore: <Icon name="connection" size={14} />,
      onSelect: () => togglePointOfContact(row.index),
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
      <AddOrEditModal
        isOpen={isAddOrEditClientTeamMemberModalOpen}
        close={closeAddOrEditClientTeamMemberModal}
        clientTeamMemberRow={row}
        isEditMode
      />
    </>
  );
};
