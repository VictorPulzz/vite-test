import { useSwitchValue } from '@appello/common/lib/hooks';
import { CellContext } from '@tanstack/table-core';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

import { ChannelTemplatesType } from '../../consts';
import { CreateOrUpdateChannelTemplateModal } from '../CreateOrUpdateChannelTemplateModal';
import { DeleteChannelTemplateModal } from './components/DeleteChannelTemplateModal';

export const MoreCell: FC<CellContext<ChannelTemplatesType, unknown>> = ({ row }) => {
  const {
    value: isCreateOrUpdateChannelTemplateModal,
    on: openCreateOrUpdateChannelTemplateModal,
    off: closeCreateOrUpdateChannelTemplateModal,
  } = useSwitchValue(false);

  const {
    value: isDeleteChannelTemplateModal,
    on: openDeleteChannelTemplateModal,
    off: closeDeleteChannelTemplateModal,
  } = useSwitchValue(false);

  const options: DropdownItem[] = [
    {
      label: 'Edit',
      iconBefore: <Icon name="edit" size={14} />,
      onSelect: openCreateOrUpdateChannelTemplateModal,
    },
    {
      label: 'Delete',
      iconBefore: <Icon name="trash" size={14} />,
      onSelect: openDeleteChannelTemplateModal,
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
      <CreateOrUpdateChannelTemplateModal
        isOpen={isCreateOrUpdateChannelTemplateModal}
        close={closeCreateOrUpdateChannelTemplateModal}
        channelTemplateRow={row}
        isEditMode
      />
      <DeleteChannelTemplateModal
        isOpen={isDeleteChannelTemplateModal}
        close={closeDeleteChannelTemplateModal}
        name={row.original.name}
      />
    </>
  );
};
