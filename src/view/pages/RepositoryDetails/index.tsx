import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
// import { isValidHttpUrl } from '~/utils/isValidHttpUrl';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Icon } from '~/view/ui/components/common/Icon';
import { Loader } from '~/view/ui/components/common/Loader';
import { Tabs } from '~/view/ui/components/common/Tabs';
import { TextLink } from '~/view/ui/components/common/TextLink';

import { useFetchRepositoryDetailsQuery } from './__generated__/schema';
import { Participants } from './components/Partisipants';
import { UpdateRepositoryModal } from './components/UpdateRepositoryModal';
import styles from './styles.module.scss';

export const RepositoryDetailsPage: FC = () => {
  const canEditRepository = useHasAccess(Permission.EDIT_REPOSITORY);

  const {
    value: isUpdateRepositoryModalOpen,
    on: openUpdateRepositoryModal,
    off: closeUpdateRepositoryModal,
  } = useSwitchValue(false);

  const params = useParams();
  const navigate = useNavigate();
  const repositoryId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const { data, loading } = useFetchRepositoryDetailsQuery({
    variables: {
      input: { id: repositoryId },
    },
  });

  const { name, project, technologies, createdAt, gitUrl, gitTerraformUrl, type } =
    data?.repository ?? {};

  const RepositoryDetailsTabs = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName={styles['tabs__body']}
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
      <DetailLayout
        title="Repository details"
        onClickBackButton={() => navigate(ROUTES.REPOSITORIES)}
        contentClassName="flex-auto"
      >
        {loading && (
          <div className="flex h-full items-center">
            <Loader full colorful />
          </div>
        )}
        {data && (
          <div className="flex gap-5 p-6 h-full">
            <SectionContainer containerClassName="w-[382px] min-w-[382px] h-[392px]">
              <div className={styles['section']}>
                <div className="flex gap-2 mb-3 ">
                  <h2 className="text-p1 font-bold">Info</h2>
                  {canEditRepository && (
                    <button
                      type="button"
                      className="hover:opacity-70"
                      onClick={openUpdateRepositoryModal}
                    >
                      <Icon name="pencil" size={14} className="text-blue " />
                    </button>
                  )}
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
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Type</span>
                    <span className="text-p3 leading-none">
                      {convertUppercaseToReadable(type as RepositoryTypeChoice)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Technologies</span>
                    <div>
                      {technologies?.map(({ id, name }, index) => [
                        index > 0 && ', ',
                        <span key={id} className="text-p3 leading-none">
                          {name}
                        </span>,
                      ])}
                    </div>
                  </div>
                  {gitUrl && (
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Git url</span>
                      <TextLink
                        external
                        to={gitUrl}
                        className="text-p3 text-blue leading-none hover:underline"
                      >
                        Git url
                      </TextLink>
                    </div>
                  )}
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Created at</span>
                    <span className="text-p3 text-primary leading-none">
                      {format(new Date(createdAt ?? ''), DateFormat.DMY)}
                    </span>
                  </div>
                  {gitTerraformUrl && (
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Git Terraform url</span>
                      <span className="text-p3 leading-none">{gitTerraformUrl}</span>
                    </div>
                  )}
                </div>
              </div>
            </SectionContainer>
            <div className="shadow-4 bg-white rounded-md flex-auto">{RepositoryDetailsTabs}</div>
            {isUpdateRepositoryModalOpen && (
              <UpdateRepositoryModal
                isOpen={isUpdateRepositoryModalOpen}
                close={closeUpdateRepositoryModal}
                repository={data.repository}
              />
            )}
          </div>
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
