import { EmptyState } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Table } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetMessagesQuery } from '~/services/rtk/lead';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useLeadMessagesTableColumns } from '~/view/pages/SalesAiLeadDetails/pages/Messages/hooks/useLeadMessagesTableColumns';

import { CreateNewMessageSection } from './components/CreateNewMessage';

export const Messages: FC = () => {
  const messagesTableColumns = useLeadMessagesTableColumns();

  const params = useParams();
  const leadId = useMemo(() => String(params.id), [params]);

  const { data, isFetching } = useGetMessagesQuery(leadId);

  return (
    <>
      {isFetching && (
        <div className="flex h-full items-center">
          <Loader full colorful />
        </div>
      )}
      {data && (
        <div className="flex flex-col gap-5">
          <CreateNewMessageSection />
          <SectionContainer title="Messages">
            {data && data?.length > 0 ? (
              <Table className="mt-3" data={data} columns={messagesTableColumns} />
            ) : (
              <EmptyState iconName="list" label="No messages here yet" />
            )}
          </SectionContainer>
        </div>
      )}
    </>
  );
};
