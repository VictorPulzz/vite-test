import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Button, ButtonVariant } from '@appello/web-ui';
import { EmptyState } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { ClientType } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';
import { AddOrEditModal } from '~/view/pages/CreateOrUpdateProject/components/ClientTeamSection/components/AddOrEditModal';

import { CLIENT_TEAM_TABLE_COLUMNS } from './consts';

export const ClientTeamSection: FC = () => {
  const { watch } = useFormContext();

  const {
    value: isAddOrEditModalOpen,
    on: openAddOrEditModal,
    off: closeAddOrEditModal,
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
          columns={CLIENT_TEAM_TABLE_COLUMNS}
          data={clientTeamMembers as ClientType[]}
        />
      )}
      <Button
        className="w-[170px] mt-3"
        label="Add team member"
        variant={ButtonVariant.SECONDARY}
        withIcon="add"
        onClick={openAddOrEditModal}
      />
      <AddOrEditModal
        close={closeAddOrEditModal}
        isEditMode={false}
        isOpen={isAddOrEditModalOpen}
      />
    </SectionContainer>
  );
};
