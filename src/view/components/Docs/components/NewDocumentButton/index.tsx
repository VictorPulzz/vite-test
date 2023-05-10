import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
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
      <Dropdown items={options} containerWidth="14.93rem">
        {({ onClick }) => (
          <Button
            variant={ButtonVariant.PRIMARY}
            label="New document"
            withIcon="plus"
            className="w-36"
            onClick={onClick}
          />
        )}
      </Dropdown>
      <UploadDocumentModal
        isOpen={isUploadDocumentModalOpen}
        close={closeUploadDocumentModal}
        projectId={projectId as number}
        userId={userId as number}
        type={type}
      />
      <GenerateDocumentModal
        isOpen={isGenerateDocumentModalOpen}
        close={closeGenerateDocumentModal}
        projectId={projectId as number}
        userId={userId as number}
        type={type}
      />
    </>
  );
};
