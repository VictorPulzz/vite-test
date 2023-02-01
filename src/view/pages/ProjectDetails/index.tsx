import { Button, ButtonVariant } from '@ui/components/common/Button';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Tabs } from '~/view/ui/components/common/Tabs';

import { useFetchProjectDetailsQuery } from './__generated__/schema';
import { Info } from './components/Info';

export const ProjectDetailsPage: FC = () => {
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const { data } = useFetchProjectDetailsQuery({
    variables: {
      data: { id: projectId },
    },
  });

  return (
    <SidebarLayout contentClassName="bg-gray-7">
      <div className="bg-white w-full">
        <div className="flex items-center justify-between px-7 pt-7">
          <div className="flex flex-col">
            <h2 className="text-p1 font-bold">{data?.project.name}</h2>
            <span className="text-c1 text-gray-2">Created 18 Jul 2022 • by Alex C.</span>
          </div>
          <Button
            variant={ButtonVariant.SECONDARY}
            label="Edit project"
            withIcon="edit"
            onClick={() => null}
            className="w-[140px]"
          />
        </div>
        <Tabs
          className="mt-3"
          contentClassName="bg-gray-7 p-7"
          items={[
            {
              title: 'Overview',
              element: <div>Overview</div>,
            },
            {
              title: 'Info',
              element: <Info />,
            },
            {
              title: 'Team',
              element: <span>Team</span>,
            },
            {
              title: 'Development',
              element: <span>Development</span>,
            },
            {
              title: 'Docs',
              element: <span>Docs</span>,
            },
            {
              title: 'Reports',
              element: <span>Reports</span>,
            },
            {
              title: 'History',
              element: <span>History</span>,
            },
          ]}
        />
      </div>
    </SidebarLayout>
  );
};
