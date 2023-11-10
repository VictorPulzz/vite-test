import { useSwitchValue } from '@appello/common';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Button, ButtonVariant } from '@appello/web-ui';
import React, { FC } from 'react';

import { DocsType } from '../../types';
import { GenerateDocumentModal } from './components/GenerateDocumentModal';
import { UploadDocumentModal } from './components/UploadDocumentModal';

interface Props {
  projectId?: number;
  userId?: number;
  type: DocsType;
}

export const NewDocumentButton: FC<Props> = ({ projectId, userId, type }) => {
  const {
    value: isUploadDocumentModalOpen,
    on: openUploadDocumentModal,
    off: closeUploadDocumentModal,
  } = useSwitchValue(false);

  const {
    value: isGenerateDocumentModalOpen,
    on: openGenerateDocumentModal,
    off: closeGenerateDocumentModal,
  } = useSwitchValue(false);

  const options: DropdownItem[] = [
    {
      label: 'Upload',
      onSelect: openUploadDocumentModal,
    },
    {
      label: 'Generate',
      onSelect: openGenerateDocumentModal,
    },
  ];

  return (
    <>
      <Dropdown containerWidth="14.93rem" items={options}>
        {({ onClick }) => (
          <Button
            className="w-36"
            label="New document"
            variant={ButtonVariant.PRIMARY}
            withIcon="plus"
            onClick={onClick}
          />
        )}
      </Dropdown>
      <UploadDocumentModal
        close={closeUploadDocumentModal}
        isOpen={isUploadDocumentModalOpen}
        projectId={projectId as number}
        type={type}
        userId={userId as number}
      />
      <GenerateDocumentModal
        close={closeGenerateDocumentModal}
        isOpen={isGenerateDocumentModalOpen}
        projectId={projectId as number}
        type={type}
        userId={userId as number}
      />
    </>
  );
};
