import { getGqlError } from '@appello/common/lib/services/gql/utils/getGqlError';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { DocumentType } from '~/services/gql/__generated__/globalTypes';
import { downloadFile } from '~/utils/downloadFile';
import {
  FetchDocumentsDocument,
  useRemoveDocumentMutation,
} from '~/view/pages/ProjectDetails/__generated__/schema';
import { Icon } from '~/view/ui/components/common/Icon';

interface Props {
  file: DocumentType['file'];
  documentId: number;
}

export const DocumentMenu: FC<Props> = ({ file, documentId }) => {
  const [removeDocument] = useRemoveDocumentMutation();

  const downloadDocument = useCallback(() => downloadFile(file.url, file.fileName), [file]);

  const removeCurrentDocument = useCallback(() => {
    toast.promise(
      removeDocument({
        variables: {
          input: { id: documentId },
        },
        refetchQueries: [FetchDocumentsDocument],
      }),
      {
        loading: 'Deleting document...',
        success: 'Document deleted',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while changing status: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [documentId, removeDocument]);

  const options: DropdownItem[] = [
    {
      label: 'Download',
      onSelect: downloadDocument,
    },
    {
      label: 'Delete',
      onSelect: removeCurrentDocument,
      className: 'text-red',
    },
  ];

  return (
    <Dropdown items={options} containerWidth="14.93rem">
      {({ onClick }) => (
        <button type="button" onClick={onClick}>
          <Icon name="menu" size={16} />
        </button>
      )}
    </Dropdown>
  );
};
