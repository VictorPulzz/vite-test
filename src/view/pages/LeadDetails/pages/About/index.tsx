import { Loader } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetLeadQuery } from '~/services/rtk/lead';
import { SectionContainer } from '~/view/components/SectionContainer';

export const About: FC = () => {
  const params = useParams();
  const leadId = useMemo(() => (params.id ? String(params.id) : ''), [params.id]);

  const { data, isLoading } = useGetLeadQuery(leadId);

  return (
    <>
      {isLoading && (
        <div className="flex h-full items-center">
          <Loader full colorful />
        </div>
      )}
      {data && (
        <div className="flex flex-col gap-5">
          <SectionContainer title="About">
            <p className="text-p3">{data.about}</p>
          </SectionContainer>
        </div>
      )}
    </>
  );
};
