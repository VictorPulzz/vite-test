import { useSwitchValue } from '@appello/common';
import { getGqlError } from '@appello/services/dist/gql';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';

import {
  FetchDocumentTemplatesListDocument,
  useRemoveDocumentTemplateMutation,
} from '../../__generated__/schema';
import { DocumentTemplatesResultType } from '../../types';
import { CreateOrUpdateDocumentTemplateModal } from '../CreateOrUpdateDocumentTemplateModal';

export const MoreCell: FC<CellContext<DocumentTemplatesResultType, unknown>> = ({ row }) => {
  const { id, name } = row.original;

  const {
    value: isCreateOrUpdateDocumentTemplateModal,
    on: openCreateOrUpdateDocumentTemplateModal,
    off: closeCreateOrUpdateDocumentTemplateModal,
  } = useSwitchValue(false);

  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const [removeDocumentTemplate] = useRemoveDocumentTemplateMutation();

  const removeCurrentDocumentTemplate = useCallback(() => {
    return toast.promise(
      removeDocumentTemplate({
        variables: {
          input: { id },
        },
        refetchQueries: [FetchDocumentTemplatesListDocument],
      }),
      {
        loading: 'Deleting document template...',
        success: 'Document template deleted',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while deleting document template: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [id, removeDocumentTemplate]);

  const options: DropdownItem[] = [
    {
      label: 'Edit',
      iconBefore: <Icon name="pencil" size={14} />,
      onSelect: openCreateOrUpdateDocumentTemplateModal,
    },
    {
      label: 'Delete',
      iconBefore: <Icon name="trash" size={14} />,
      onSelect: openConfirmActionModal,
      className: 'text-red',
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
      {isCreateOrUpdateDocumentTemplateModal && (
        <CreateOrUpdateDocumentTemplateModal
          close={closeCreateOrUpdateDocumentTemplateModal}
          documentTemplateId={id}
          isOpen={isCreateOrUpdateDocumentTemplateModal}
        />
      )}
      {isConfirmActionModal && (
        <ConfirmActionModal
          action="delete"
          close={closeConfirmActionModal}
          isOpen={isConfirmActionModal}
          name={name}
          onAccept={removeCurrentDocumentTemplate}
        />
      )}
    </>
  );
};
