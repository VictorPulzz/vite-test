import { IconContainer } from '@appello/web-ui';
import { DateInput } from '@appello/web-ui';
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
            {isRequestResolved ? (
              <span className="text-p4">
                {dueDate ? format(new Date(dueDate), DateFormat.D_MMM_Y) : 'Due date'}
              </span>
            ) : (
              <DateInput
                onChange={date => {
                  if (date) {
                    updateDueDate(date);
                  }
                }}
                value={dueDate ? new Date(dueDate) : null}
                placeholder="Due date"
              />
            )}
          </div>
        </div>
      )}
      {variant === DueDateVariant.CELL && (
        <div>
          {isRequestResolved ? (
            <span>{dueDate ? format(new Date(dueDate), DateFormat.D_MMM_Y) : 'Due date'}</span>
          ) : (
            <DateInput
              onChange={date => {
                if (date) {
                  updateDueDate(date);
                }
              }}
              value={dueDate ? new Date(dueDate) : null}
              placeholder="Due date"
            />
          )}
        </div>
      )}
    </div>
  );
};
