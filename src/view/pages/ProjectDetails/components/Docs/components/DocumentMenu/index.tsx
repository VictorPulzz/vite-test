import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC, useCallback } from 'react';

import { DocumentType } from '~/services/gql/__generated__/globalTypes';
import { downloadFile } from '~/utils/downloadFile';
import { Icon } from '~/view/ui/components/common/Icon';

interface Props {
  file: DocumentType['file'];
}

export const DocumentMenu: FC<Props> = ({ file }) => {
  const downloadDocument = useCallback(() => downloadFile(file.url, file.fileName), [file]);

  const options: DropdownItem[] = [
    {
      label: 'Download',
      onSelect: downloadDocument,
    },
    {
      label: 'Delete',
      onSelect: () => null,
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
