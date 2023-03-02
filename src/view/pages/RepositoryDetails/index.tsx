import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { SectionContainer } from '~/view/components/SectionContainer';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Icon } from '~/view/ui/components/common/Icon';
import { Loader } from '~/view/ui/components/common/Loader';
import { Tabs } from '~/view/ui/components/common/Tabs';

import { useFetchRepositoryDetailsQuery } from './__generated__/schema';
import { Participants } from './components/Partisipants';
import { UpdateRepositoryModal } from './components/UpdateRepositoryModal';
import styles from './styles.module.scss';

export const RepositoryDetailsPage: FC = () => {
  const {
    value: isUpdateRepositoryModalOpen,
    on: openUpdateRepositoryModal,
    off: closeUpdateRepositoryModal,
  } = useSwitchValue(false);

  const params = useParams();
  const repositoryId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const { data, loading } = useFetchRepositoryDetailsQuery({
    variables: {
      input: { id: repositoryId },
    },
  });

  const { name, project, createdAt, gitUrl, gitTerraformUrl } = data?.repository ?? {};

  const RepositoryDetailsTabs = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName="p-7 flex-auto"
        items={[
          {
            title: 'Partisipants',
            element: <Participants />,
          },
        ]}
      />
    ),
    [],
  );

  return (
    <SidebarLayout>
      <DetailLayout title="Repository details">
        {loading && (
          <div className="pt-6">
            <Loader full colorful />
          </div>
        )}
        {data && (
          <div className="flex gap-5 p-6 min-h-[calc(90vh+2rem)]">
            <SectionContainer containerClassName="w-[382px] min-w-[382px]">
              <div className={styles['section']}>
                <div className="flex gap-2 mb-3 ">
                  <h2 className="text-p1 font-bold">Info</h2>
                  <button
                    type="button"
                    className="hover:opacity-70"
                    onClick={openUpdateRepositoryModal}
                  >
                    <Icon name="pencil" size={14} className="text-blue " />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Name</span>
                    <span className="text-p3 leading-none">{name}</span>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Project</span>
                    <span className="text-p3 leading-none">{project?.name}</span>
                  </div>
                  {/* TODO add TextLink */}
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Git url</span>
                    <span className="text-p3 leading-none">{gitUrl}</span>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Created at</span>
                    <span className="text-p3 text-primary leading-none">
                      {format(new Date(createdAt ?? ''), DateFormat.DMY)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Git Terraform url</span>
                    <span className="text-p3 leading-none">{gitTerraformUrl}</span>
                  </div>
                  {/* TODO add fields when backend will be ready */}
                </div>
              </div>
            </SectionContainer>
            <div className="shadow-4 bg-white rounded-md flex-auto">{RepositoryDetailsTabs}</div>
            <UpdateRepositoryModal
              isOpen={isUpdateRepositoryModalOpen}
              close={closeUpdateRepositoryModal}
            />
          </div>
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
