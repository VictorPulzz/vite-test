import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { ClientType } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Table } from '~/view/ui/components/common/Table';

import { AddOrEditClientTeamMemberModal } from './components/AddOrEditClientTeamMemberModal';
import { CLIENT_TEAM_TABLE_COLUMNS } from './consts';

export const ClientTeamSection: FC = () => {
  const { watch } = useFormContext();

  const {
    value: isAddOrEditClientTeamMemberModalOpen,
    on: openAddOrEditClientTeamMemberModal,
    off: closeAddOrEditClientTeamMemberModal,
  } = useSwitchValue(false);

  const clientTeamMembers = watch('clientTeam');

  return (
    <SectionContainer title="Client team">
      {clientTeamMembers.length === 0 && (
        <EmptyState iconName="users" label="No members here yet" />
      )}
      {!!clientTeamMembers.length && (
        <Table
          className="mt-3"
          data={clientTeamMembers as ClientType[]}
          columns={CLIENT_TEAM_TABLE_COLUMNS}
        />
      )}
      <Button
        variant={ButtonVariant.SECONDARY}
        label="Add team member"
        withIcon="add"
        className="w-[170px] mt-3"
        onClick={openAddOrEditClientTeamMemberModal}
      />
      <AddOrEditClientTeamMemberModal
        isOpen={isAddOrEditClientTeamMemberModalOpen}
        close={closeAddOrEditClientTeamMemberModal}
        isEditMode={false}
      />
    </SectionContainer>
  );
};
