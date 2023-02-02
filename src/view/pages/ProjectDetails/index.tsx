import { Button, ButtonVariant } from '@ui/components/common/Button';
import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Tabs } from '~/view/ui/components/common/Tabs';

import { useFetchProjectDetailsQuery } from './__generated__/schema';
import { Docs } from './components/Docs';
import { History } from './components/History';
import { Info } from './components/Info';
import { Reports } from './components/Reports';
import { Team } from './components/Team';
import styles from './styles.module.scss';

export const ProjectDetailsPage: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const { data } = useFetchProjectDetailsQuery({
    variables: {
      data: { id: projectId },
    },
  });

  return (
    <SidebarLayout contentClassName="bg-gray-7">
      <div className="bg-white">
        <div className="flex items-center justify-between px-7 pt-7">
          <div className="flex items-center gap-4">
            <Button
              variant={ButtonVariant.SECONDARY}
              withIcon="left-arrow"
              onClick={() => navigate(-1)}
            />
            <div className="flex flex-col">
              <h2 className="text-h4 font-bold">{data?.project.name}</h2>
              <span className="text-c1 text-gray-2 leading-none">
                Created 18 Jul 2022 • by Alex C.
              </span>
            </div>
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
          className={styles['tabs']}
          contentClassName="bg-gray-7 p-7 flex-auto"
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
              element: <Team />,
            },
            {
              title: 'Development',
              element: <span>Development</span>,
            },
            {
              title: 'Docs',
              element: <Docs />,
            },
            {
              title: 'Reports',
              element: <Reports />,
            },
            {
              title: 'History',
              element: <History />,
            },
          ]}
        />
      </div>
    </SidebarLayout>
  );
};
