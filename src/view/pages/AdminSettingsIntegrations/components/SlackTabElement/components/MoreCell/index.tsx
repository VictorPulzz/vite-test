import { useSwitchValue } from '@appello/common/lib/hooks';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC } from 'react';

import { SlackChannelTemplateResultType } from '../../types';
import { CreateOrUpdateChannelTemplateModal } from '../CreateOrUpdateChannelTemplateModal';
import { DeleteChannelTemplateModal } from './components/DeleteChannelTemplateModal';

export const MoreCell: FC<CellContext<SlackChannelTemplateResultType, unknown>> = ({ row }) => {
  const { id, label } = row.original;

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
      {isCreateOrUpdateChannelTemplateModal && (
        <CreateOrUpdateChannelTemplateModal
          isOpen={isCreateOrUpdateChannelTemplateModal}
          close={closeCreateOrUpdateChannelTemplateModal}
          channelTemplateId={id}
        />
      )}
      {isDeleteChannelTemplateModal && (
        <DeleteChannelTemplateModal
          isOpen={isDeleteChannelTemplateModal}
          close={closeDeleteChannelTemplateModal}
          name={label ?? ''}
          id={id}
        />
      )}
    </>
  );
};
