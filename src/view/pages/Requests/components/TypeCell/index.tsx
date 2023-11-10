import { useSwitchValue } from '@appello/common';
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
      <button className="underline cursor-pointer" type="button" onClick={openAccessRequestModal}>
        {convertUppercaseToReadable(type ?? '')}
      </button>
      {isAccessRequestModalOpen && (
        <RequestDetailsModal
          close={closeAccessRequestModal}
          isOpen={isAccessRequestModalOpen}
          requestId={id}
        />
      )}
    </>
  );
};
