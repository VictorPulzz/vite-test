import { useSwitchValue } from '@appello/common';
import { getGqlError } from '@appello/services';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import React, { FC, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

import { downloadFile } from '~/utils/downloadFile';
import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';

import {
  FetchClientDocumentsDocument,
  FetchInternalDocumentsDocument,
  FetchProjectDocumentsDocument,
  FetchUserDocumentsDocument,
  useRemoveDocumentMutation,
} from '../../__generated__/schema';
import { DocsType } from '../../types';

interface Props {
  fileUrl: string;
  documentId: number;
  documentName: string;
  type: DocsType;
}

export const DocumentMenu: FC<Props> = ({ fileUrl, documentId, documentName, type }) => {
  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const downloadDocument = useCallback(
    () => downloadFile(fileUrl, documentName),
    [fileUrl, documentName],
  );

  const refetchList = useMemo(() => {
    switch (true) {
      case type === DocsType.INTERNAL:
        return [FetchInternalDocumentsDocument];
      case type === DocsType.CLIENT:
        return [FetchClientDocumentsDocument];
      case type === DocsType.PROJECT:
        return [FetchProjectDocumentsDocument];
      case type === DocsType.USER:
        return [FetchUserDocumentsDocument];
      default:
        return [];
    }
  }, [type]);

  const [removeDocument] = useRemoveDocumentMutation();

  const removeCurrentDocument = useCallback(() => {
    return toast.promise(
      removeDocument({
        variables: {
          input: { id: documentId },
        },
        refetchQueries: refetchList,
      }),
      {
        loading: 'Deleting document...',
        success: 'Document deleted',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while deleting document: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [documentId, refetchList, removeDocument]);

  const options: DropdownItem[] = [
    {
      label: 'Download',
      onSelect: downloadDocument,
    },
    {
      label: 'Delete',
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
      {isConfirmActionModal && (
        <ConfirmActionModal
          action="delete"
          close={closeConfirmActionModal}
          isOpen={isConfirmActionModal}
          name={documentName}
          onAccept={removeCurrentDocument}
        />
      )}
    </>
  );
};
