import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { SectionContainer } from '~/view/components/SectionContainer';
import { Table } from '~/view/ui/components/common/Table';
import { TextLink } from '~/view/ui/components/common/TextLink';

import { CLIENT_TEAM_TABLE_COLUMNS } from './consts';

// TODO remove repositoriesTestData when backend will be ready
const clientTeamTestData = [
  {
    fullName: 'Robert Smith',
    email: 'example@com',
    phone: '0454 842 032',
    position: 'CEO',
    notes: 'Available only on Mon',
  },
  {
    fullName: 'Jesse Anderson',
    email: 'example@com',
    phone: '0454 842 032',
    position: 'Developer',
    notes: 'Available only on Mon',
  },
  {
    fullName: 'Randy Coleman',
    email: 'example@com',
    phone: '0454 842 032',
    position: 'CTO',
    notes: 'Available only on Mon',
  },
];

export const Info: FC = () => {
  // TODO remove participantsTestData when backend will be ready
  //   const participantsTestData = new Array(9).fill(participantTestData);

  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projectId = params.id ? Number(params.id) : 0;

  // const { data, loading } = useFetchProjectRepositoriesQuery({
  //   variables: {
  //     data: { id: projectId },
  //   },
  // });

  // TODO remove test data later
  const data = {
    loading: false,
    clientTeamList: clientTeamTestData,
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionContainer title="General">
        <div className="grid grid-cols-2 gap-y-[15px] mt-3">
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Project status</span>
            <span className="text-p3 leading-none">In progress</span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Start date</span>
            <span className="text-p3 leading-none">28 Mar 2022</span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Estimated end date</span>
            <span className="text-p3 leading-none">1 Feb 2023 (in 43d )</span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Current phase</span>
            <span className="text-p3 leading-none">MVP Development</span>
          </div>
          <div className="flex flex-col gap-[2px] break-words">
            <span className="text-c1 text-gray-2">Design link</span>
            <TextLink
              external
              to="https://www.figma.com/file/8T6cuBdFJeUz4jwBzfZE7h/Untitled?node-id=1%3A4275&t=YqWzSw0DCpWG9RMx-0"
              className="text-p3 text-blue leading-none hover:underline"
            >
              Design link
            </TextLink>
          </div>
          <div className="flex flex-col gap-[2px] break-words">
            <span className="text-c1 text-gray-2">Roadmap</span>
            <TextLink
              external
              to="https://www.figma.com/file/8T6cuBdFJeUz4jwBzfZE7h/Untitled?node-id=1%3A4275&t=YqWzSw0DCpWG9RMx-0"
              className="text-p3 text-blue leading-none hover:underline"
            >
              Roadmap link
            </TextLink>
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Notes</span>
            <span className="text-p3 leading-none">Some notes go here</span>
          </div>
        </div>
      </SectionContainer>
      <SectionContainer title="Client team">
        <Table className="mt-3" data={data.clientTeamList} columns={CLIENT_TEAM_TABLE_COLUMNS} />
      </SectionContainer>
    </div>
  );
};
