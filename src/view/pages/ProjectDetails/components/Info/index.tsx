import { format, formatDuration, intervalToDuration, isPast, parseISO } from 'date-fns';
import React, { FC, useMemo } from 'react';

import { DateFormat } from '~/constants/dates';
import { ProjectPhaseChoice, StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { getBadgeByProjectStatus } from '~/utils/getBadgeByProjectStatus';
import { isValidHttpUrl } from '~/utils/isValidHttpUrl';
import { SectionContainer } from '~/view/components/SectionContainer';
import { Badge } from '~/view/ui/components/common/Badge';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Table } from '~/view/ui/components/common/Table';
import { TextLink } from '~/view/ui/components/common/TextLink';

import { FetchProjectDetailsQuery } from '../../__generated__/schema';
import { CLIENT_TEAM_TABLE_COLUMNS } from './consts';

interface Props {
  projectInfo: FetchProjectDetailsQuery['project'];
}

export const Info: FC<Props> = ({
  projectInfo: { status, startDate, endDate, phase, design, roadmap, notes, clientTeam },
}) => {
  const isPastEndDate = useMemo(() => isPast(new Date(endDate as string)), [endDate]);

  const durationToEndDate = useMemo(
    () =>
      formatDuration(
        intervalToDuration({
          start: new Date(parseISO(endDate as string)),
          end: new Date(),
        }),
        {
          format: ['years', 'months', 'days', 'hours'],
        },
      ),
    [endDate],
  );

  return (
    <div className="flex flex-col gap-5">
      <SectionContainer title="General">
        <div className="grid grid-cols-2 gap-y-[15px] mt-3">
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Project status</span>
            <Badge color={getBadgeByProjectStatus(status as StatusEnum)}>
              {convertUppercaseToReadable(status as StatusEnum)}
            </Badge>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Start date</span>
            <span className="text-p3 leading-none">
              {format(new Date(startDate), DateFormat.PP)}
            </span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Estimated end date</span>
            <span className="text-p3 leading-none">
              {format(new Date(String(endDate)), DateFormat.PP)}{' '}
              <span className="text-gray-2">{!isPastEndDate && `(in ${durationToEndDate})`}</span>
            </span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Current phase</span>
            <span className="text-p3 leading-none">
              {convertUppercaseToReadable(phase as ProjectPhaseChoice)}
            </span>
          </div>
          <div className="flex flex-col gap-[2px] break-words">
            <span className="text-c1 text-gray-2">Design link</span>
            <TextLink
              external
              to={design ?? ''}
              className={`text-p3 text-blue leading-none hover:underline ${
                !isValidHttpUrl(design ?? '') && 'pointer-events-none'
              }`}
            >
              Design link
            </TextLink>
          </div>
          <div className="flex flex-col gap-[2px] break-words">
            <span className="text-c1 text-gray-2">Roadmap</span>
            <TextLink
              external
              to={roadmap ?? ''}
              className={`text-p3 text-blue leading-none hover:underline ${
                !isValidHttpUrl(roadmap ?? '') && 'pointer-events-none'
              }`}
            >
              Roadmap link
            </TextLink>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2 leading-none">Notes</span>
            <span className="text-p3 w-3/4 leading-5">{notes}</span>
          </div>
        </div>
      </SectionContainer>
      <SectionContainer title="Client team">
        {clientTeam?.length ? (
          <Table className="mt-3" data={clientTeam} columns={CLIENT_TEAM_TABLE_COLUMNS} />
        ) : (
          <EmptyState iconName="users" label="No client team members here yet" />
        )}
      </SectionContainer>
    </div>
  );
};
