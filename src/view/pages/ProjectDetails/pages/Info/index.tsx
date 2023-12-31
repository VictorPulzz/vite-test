import { Badge, BadgeColor } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import { TextLink } from '@appello/web-ui';
import clsx from 'clsx';
import { format, formatDuration, intervalToDuration, isPast, parseISO } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ProjectPhaseChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { isValidHttpUrl } from '~/utils/isValidHttpUrl';
import { SectionContainer } from '~/view/components/SectionContainer';

import { useFetchProjectInfoQuery } from '../../__generated__/schema';
import { CLIENT_TEAM_TABLE_COLUMNS } from './consts';

export const Info: FC = () => {
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;
  const { data, loading } = useFetchProjectInfoQuery({
    variables: {
      data: { id: projectId },
    },
    fetchPolicy: 'cache-and-network',
  });

  const {
    status,
    startDate,
    endDate,
    phase,
    design,
    roadmap,
    kanbanBoard,
    notes,
    clientTeam,
    platforms,
    daysEstimated,
  } = data?.project ?? {};

  const isPastEndDate = useMemo(() => isPast(endDate ? new Date(endDate) : new Date()), [endDate]);

  const durationToEndDate = useMemo(
    () =>
      formatDuration(
        intervalToDuration({
          start: endDate ? new Date(parseISO(endDate)) : new Date(),
          end: new Date(),
        }),
        {
          format: ['years', 'months', 'days', 'hours'],
        },
      ),
    [endDate],
  );

  return (
    <>
      {loading && (
        <div className="flex h-full items-center">
          <Loader colorful full />
        </div>
      )}
      {data && (
        <div className="flex flex-col gap-5">
          <SectionContainer title="General">
            <div className="grid grid-cols-2 gap-4 mt-3">
              {status && (
                <div className="flex flex-col gap-[2px]">
                  <span className="text-p5 text-gray-2">Project status</span>
                  <Badge color={BadgeColor.BLUE}>{status?.name}</Badge>
                </div>
              )}
              {platforms && !!platforms.length && (
                <div className="flex flex-col gap-[2px]">
                  <span className="text-p5 text-gray-2 leading-none">Platform</span>
                  <div>
                    {platforms.map(({ id, name }, index) => [
                      index > 0 && ', ',
                      <span className="text-p3 leading-none" key={id}>
                        {name}
                      </span>,
                    ])}
                  </div>
                </div>
              )}
              {startDate && (
                <div className="flex flex-col gap-[2px]">
                  <span className="text-p5 text-gray-2">Start date</span>
                  <span className="text-p3 leading-none">
                    {format(new Date(startDate), DateFormat.D_MMM_Y)}
                  </span>
                </div>
              )}
              {endDate && (
                <div className="flex flex-col gap-[2px]">
                  <span className="text-p5 text-gray-2">Estimated end date</span>
                  <span className="text-p3 leading-none">
                    {format(new Date(endDate), DateFormat.D_MMM_Y)}{' '}
                    <span className="text-gray-2">
                      {!isPastEndDate && `(in ${durationToEndDate})`}
                    </span>
                  </span>
                </div>
              )}
              {!!daysEstimated && (
                <div className="flex flex-col gap-[2px]">
                  <span className="text-p5 text-gray-2 leading-none">Estimated days</span>
                  <span className="text-p3 w-3/4 leading-5 break-words">{daysEstimated}</span>
                </div>
              )}
              {design && (
                <div className="flex flex-col gap-[2px] break-words">
                  <span className="text-p5 text-gray-2">Design link</span>
                  <TextLink
                    external
                    className={clsx('text-p3 text-blue leading-none hover:underline', {
                      'pointer-events-none': !isValidHttpUrl(design ?? ''),
                    })}
                    to={design ?? ''}
                  >
                    Design link
                  </TextLink>
                </div>
              )}
              {roadmap && (
                <div className="flex flex-col gap-[2px] break-words">
                  <span className="text-p5 text-gray-2">Roadmap</span>
                  <TextLink
                    external
                    className={`text-p3 text-blue leading-none hover:underline ${
                      !isValidHttpUrl(roadmap) && 'pointer-events-none'
                    }`}
                    to={roadmap}
                  >
                    Roadmap link
                  </TextLink>
                </div>
              )}
              {kanbanBoard && (
                <div className="flex flex-col gap-[2px] break-words">
                  <span className="text-p5 text-gray-2">Kanban board</span>
                  <TextLink
                    external
                    className={`text-p3 text-blue leading-none hover:underline ${
                      !isValidHttpUrl(kanbanBoard) && 'pointer-events-none'
                    }`}
                    to={kanbanBoard}
                  >
                    Kanban board link
                  </TextLink>
                </div>
              )}
              <div className="flex flex-col gap-[2px]">
                <span className="text-p5 text-gray-2">Current phase</span>
                <span className="text-p3 leading-none">
                  {convertUppercaseToReadable(phase as ProjectPhaseChoice)}
                </span>
              </div>
              {notes && (
                <div className="flex flex-col gap-[2px]">
                  <span className="text-p5 text-gray-2 leading-none">Notes</span>
                  <span className="text-p3 w-3/4 leading-5 break-words">{notes}</span>
                </div>
              )}
            </div>
          </SectionContainer>
          <SectionContainer title="Client team">
            {clientTeam && !!clientTeam.length ? (
              <Table className="mt-3" columns={CLIENT_TEAM_TABLE_COLUMNS} data={clientTeam} />
            ) : (
              <EmptyState iconName="users" label="No client team members here yet" />
            )}
          </SectionContainer>
        </div>
      )}
    </>
  );
};
