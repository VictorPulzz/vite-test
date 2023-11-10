import { Badge, BadgeColor } from '@appello/web-ui';
import { Button, ButtonSize, ButtonVariant } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback } from 'react';

import { RequestStatusChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { RequestResultType } from '~/view/pages/Requests/types';

import { FetchRequestsListDocument, useUpdateRequestMutation } from '../../__generated__/schema';

export const StatusCell: FC<CellContext<RequestResultType, unknown>> = ({ row }) => {
  const { id, status } = row.original;

  const [updateRequest, { loading }] = useUpdateRequestMutation();

  const resolveRequest = useCallback(() => {
    updateRequest({
      variables: {
        input: { id, status: RequestStatusChoice.RESOLVED },
      },
      refetchQueries: [FetchRequestsListDocument],
    });
  }, [id, updateRequest]);

  return (
    <div>
      {status === RequestStatusChoice.RESOLVED ? (
        <Badge color={BadgeColor.GREEN}>{convertUppercaseToReadable(status)}</Badge>
      ) : (
        <Button
          className="w-[95px]"
          isLoading={loading}
          label="Resolve"
          size={ButtonSize.SMALL}
          variant={ButtonVariant.SECONDARY}
          onClick={resolveRequest}
        />
      )}
    </div>
  );
};
