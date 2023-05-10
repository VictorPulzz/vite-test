import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { CellContext } from '@tanstack/table-core';
import React, { FC } from 'react';

import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { RequestDetailsModal } from '~/view/pages/Requests/components/RequestDetailsModal';
import { RequestResultType } from '~/view/pages/Requests/types';

export const TypeCell: FC<CellContext<RequestResultType, unknown>> = ({ row }) => {
  const { type, id } = row.original;

  const {
    value: isAccessRequestModalOpen,
    on: openAccessRequestModal,
    off: closeAccessRequestModal,
  } = useSwitchValue(false);

  return (
    <>
      <button type="button" className="underline cursor-pointer" onClick={openAccessRequestModal}>
        {convertUppercaseToReadable(type ?? '')}
      </button>
      {isAccessRequestModalOpen && (
        <RequestDetailsModal
          isOpen={isAccessRequestModalOpen}
          close={closeAccessRequestModal}
          requestId={id}
        />
      )}
    </>
  );
};
