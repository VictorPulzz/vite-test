import { Loader } from '@appello/web-ui';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetLeadQuery } from '~/services/rtk/lead';
import { SectionContainer } from '~/view/components/SectionContainer';

export const About: FC = () => {
  const params = useParams();
  const leadId = String(params.id);

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
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="flex flex-col gap-[2px]">
                <div>
                  <span className="text-p3 leading-none">{data.about}</span>
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>
      )}
    </>
  );
};
