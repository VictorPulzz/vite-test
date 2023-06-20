import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { Button, ButtonVariant, EmptyState } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetMessagesQuery } from '~/services/rtk/lead';
import { SectionContainer } from '~/view/components/SectionContainer';
import { CreateNewMessageModal } from '~/view/pages/LeadDetails/pages/Messages/components/AddMessageModal';
import { useLeadMessagesTableColumns } from '~/view/pages/LeadDetails/pages/Messages/hooks/useLeadMessagesTableColumns';

export const Messages: FC = () => {
  const messagesTableColumns = useLeadMessagesTableColumns();

  const params = useParams();
  const leadId = useMemo(() => String(params.id), [params]);

  const { data, isLoading } = useGetMessagesQuery(leadId);
  const {
    value: isCreateNewMessageModalOpen,
    on: openCreateNewMessageModal,
    off: closeCreateNewMessageModal,
  } = useSwitchValue(false);

  return (
    <>
      {isLoading && (
        <div className="flex h-full items-center">
          <Loader full colorful />
        </div>
      )}
      {data && (
        <div className="flex flex-col gap-5">
          <SectionContainer title="Messages">
            <Button
              variant={ButtonVariant.SECONDARY}
              label="Create new message"
              className="mt-6 w-[190px]"
              onClick={openCreateNewMessageModal}
            />
            {data && data?.length > 0 ? (
              <Table className="mt-3" data={data} columns={messagesTableColumns} />
            ) : (
              <EmptyState iconName="code" label="No messges here yet" />
            )}
          </SectionContainer>
          <CreateNewMessageModal
            isOpen={isCreateNewMessageModalOpen}
            close={closeCreateNewMessageModal}
          />
        </div>
      )}
    </>
  );
};
