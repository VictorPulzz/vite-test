import { DatePicker, IconContainer } from '@appello/web-ui';
import { format, formatISO } from 'date-fns';
import React, { FC, useCallback } from 'react';

import { DateFormat } from '~/constants/dates';
import { RequestStatusChoice } from '~/services/gql/__generated__/globalTypes';

import { FetchRequestsListDocument, useUpdateRequestMutation } from '../../__generated__/schema';

export enum DueDateVariant {
  CELL = 'CELL',
  FIELD = 'FIELD',
}

interface Props {
  variant: DueDateVariant;
  id: number;
  dueDate: string;
  status: RequestStatusChoice;
}

export const DueDate: FC<Props> = ({ variant, id, dueDate, status }) => {
  const [updateRequest] = useUpdateRequestMutation();

  const updateDueDate = useCallback(
    (date: Date) => {
      updateRequest({
        variables: {
          input: { id, dueDate: formatISO(date, { representation: 'date' }) },
        },
        refetchQueries: [FetchRequestsListDocument],
      });
    },
    [id, updateRequest],
  );

  const isRequestResolved = status === RequestStatusChoice.RESOLVED;

  const bodyElement = (
    <div>
      {isRequestResolved ? (
        <span>{dueDate ? format(new Date(dueDate), DateFormat.D_MMM_Y) : 'Due date'}</span>
      ) : (
        <DatePicker
          onChange={date => {
            if (date) {
              updateDueDate(date);
            }
          }}
          defaultValue={dueDate ? new Date(dueDate) : undefined}
          placeholder="Due date"
        />
      )}
    </div>
  );

  return (
    <div>
      {variant === DueDateVariant.FIELD && (
        <div className="flex items-center gap-[25px]">
          <span className="text-p4 text-gray-2">Due date</span>
          <div className="flex gap-3 items-center ml-3">
            <IconContainer
              name="calendar"
              className="w-[32px] h-[32px] bg-gray/10"
              iconClassName="w-[18px] h-[18px] text-gray-1"
            />
            {bodyElement}
          </div>
        </div>
      )}
      {variant === DueDateVariant.CELL && bodyElement}
    </div>
  );
};
