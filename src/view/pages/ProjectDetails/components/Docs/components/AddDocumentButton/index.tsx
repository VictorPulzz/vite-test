import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Dropdown, DropdownItem } from '@ui/components/common/Dropdown';
import React, { FC } from 'react';

import { Button, ButtonVariant } from '~/view/ui/components/common/Button';

import { GenerateDocumentModal } from './components/GenerateDocumentModal';

interface Props {
  projectId: number;
}

export const AddDocumentButton: FC<Props> = ({ projectId }) => {
  const {
    value: isGenerateDocumentModalOpen,
    on: openGenerateDocumentModal,
    off: closeGenerateDocumentModal,
  } = useSwitchValue(false);
  const options: DropdownItem[] = [
    {
      label: 'Upload',
      onSelect: () => null,
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
            label="Add document"
            withIcon="add"
            className="w-36"
            onClick={onClick}
          />
        )}
      </Dropdown>
      <GenerateDocumentModal
        isOpen={isGenerateDocumentModalOpen}
        close={closeGenerateDocumentModal}
        projectId={projectId}
      />
    </>
  );
};
