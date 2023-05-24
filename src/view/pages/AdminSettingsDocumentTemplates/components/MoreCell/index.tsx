import { useSwitchValue } from '@appello/common/lib/hooks';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC } from 'react';

import { DocumentTemplatesResultType } from '../../types';
import { CreateOrUpdateDocumentTemplateModal } from '../CreateOrUpdateDocumentTemplateModal';
import { DeleteDocumentTemplateModal } from './components/DeleteDocumentTemplateModal';

export const MoreCell: FC<CellContext<DocumentTemplatesResultType, unknown>> = ({ row }) => {
  const { id, name } = row.original;

  const {
    value: isCreateOrUpdateDocumentTemplateModal,
    on: openCreateOrUpdateDocumentTemplateModal,
    off: closeCreateOrUpdateDocumentTemplateModal,
  } = useSwitchValue(false);

  const {
    value: isDeleteDocumentTemplateModalOpen,
    on: openDeleteDocumentTemplateModal,
    off: closeDeleteDocumentTemplateModal,
  } = useSwitchValue(false);

  const options: DropdownItem[] = [
    {
      label: 'Edit',
      iconBefore: <Icon name="pencil" size={14} />,
      onSelect: openCreateOrUpdateDocumentTemplateModal,
    },
    {
      label: 'Delete',
      iconBefore: <Icon name="trash" size={14} />,
      onSelect: openDeleteDocumentTemplateModal,
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
      {isCreateOrUpdateDocumentTemplateModal && (
        <CreateOrUpdateDocumentTemplateModal
          isOpen={isCreateOrUpdateDocumentTemplateModal}
          close={closeCreateOrUpdateDocumentTemplateModal}
          documentTemplateId={id}
        />
      )}
      {isDeleteDocumentTemplateModalOpen && (
        <DeleteDocumentTemplateModal
          isOpen={isDeleteDocumentTemplateModalOpen}
          close={closeDeleteDocumentTemplateModal}
          id={id}
          name={name}
        />
      )}
    </>
  );
};
