import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Icon } from '@appello/web-ui';
import { TextLink } from '@appello/web-ui';
import { format } from 'date-fns';
import React, { FC } from 'react';

import { DateFormat } from '~/constants/dates';
import { Permission } from '~/constants/permissions';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';

import { FetchRepositoryDetailsQuery } from '../../__generated__/schema';
import { UpdateRepositoryModal } from './components/UpdateRepositoryModal';

interface Props {
  repository: FetchRepositoryDetailsQuery['repository'];
}

export const RepositoryMainInfo: FC<Props> = ({ repository }) => {
  const { name, project, technologies, createdAt, gitUrl, gitTerraformUrl, type } = repository;

  const canEditRepository = useHasAccess(Permission.EDIT_REPOSITORY);

  const {
    value: isUpdateRepositoryModalOpen,
    on: openUpdateRepositoryModal,
    off: closeUpdateRepositoryModal,
  } = useSwitchValue(false);

  return (
    <SectionContainer containerClassName="w-[382px] min-w-[382px] h-fit">
      <div className="flex gap-2 mb-3 ">
        <h2 className="text-p1 font-bold">Info</h2>
        {canEditRepository && (
          <button type="button" className="hover:opacity-70" onClick={openUpdateRepositoryModal}>
            <Icon name="pencil" size={14} className="text-blue " />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-[2px]">
          <span className="text-p5 text-gray-2">Name</span>
          <span className="text-p3 leading-none break-words">{name}</span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-p5 text-gray-2">Project</span>
          <span className="text-p3 break-words leading-4">{project?.name}</span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-p5 text-gray-2">Type</span>
          <span className="text-p3 leading-none">{convertUppercaseToReadable(type ?? '')}</span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-p5 text-gray-2">Technologies</span>
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
            <span className="text-p5 text-gray-2">Git url</span>
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
          <span className="text-p5 text-gray-2">Created at</span>
          <span className="text-p3 text-primary leading-none">
            {format(new Date(createdAt ?? ''), DateFormat.DMY)}
          </span>
        </div>
        {gitTerraformUrl && (
          <div className="flex flex-col gap-[2px]">
            <span className="text-p5 text-gray-2">Git Terraform url</span>
            <span className="text-p3 leading-none">{gitTerraformUrl}</span>
          </div>
        )}
      </div>
      {isUpdateRepositoryModalOpen && (
        <UpdateRepositoryModal
          isOpen={isUpdateRepositoryModalOpen}
          close={closeUpdateRepositoryModal}
          repository={repository}
        />
      )}
    </SectionContainer>
  );
};
