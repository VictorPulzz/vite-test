import { useSwitchValue } from '@appello/common/lib/hooks';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC } from 'react';

import { PropmtResultType } from '../../types';
import { CreateOrUpdatePromptModal } from '../CreateOrUpdatePromptModal';
import { DeletePromptModal } from './components/DeletePromptModal';

export const MoreCell: FC<CellContext<PropmtResultType, unknown>> = ({ row }) => {
  const { id, name } = row.original;

  const {
    value: isCreateOrUpdatePromptModalOpen,
    on: openCreateOrUpdatePromptModal,
    off: closeCreateOrUpdatePromptModal,
  } = useSwitchValue(false);

  const {
    value: isDeletePromptModalOpen,
    on: openDeletePromptModal,
    off: closeDeletePromptModal,
  } = useSwitchValue(false);

  const options: DropdownItem[] = [
    {
      label: 'Edit',
      iconBefore: <Icon name="pencil" size={14} />,
      onSelect: openCreateOrUpdatePromptModal,
    },
    {
      label: 'Delete',
      iconBefore: <Icon name="trash" size={14} />,
      onSelect: openDeletePromptModal,
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
      {isCreateOrUpdatePromptModalOpen && (
        <CreateOrUpdatePromptModal
          isOpen={isCreateOrUpdatePromptModalOpen}
          close={closeCreateOrUpdatePromptModal}
          promptId={id}
        />
      )}
      {isDeletePromptModalOpen && (
        <DeletePromptModal
          isOpen={isDeletePromptModalOpen}
          close={closeDeletePromptModal}
          id={id}
          name={name}
        />
      )}
    </>
  );
};
