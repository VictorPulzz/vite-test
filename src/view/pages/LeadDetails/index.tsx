import { Button, ButtonVariant } from '@appello/web-ui';
import { Loader } from '@appello/web-ui';
import { Tabs } from '@appello/web-ui';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { useGetLeadQuery } from '~/services/rtk/lead';
import { TabLayout } from '~/view/layouts/TabLayout';

import { useLeadTabs } from './hooks/useLeadTabs';
import styles from './styles.module.scss';

export const LeadDetailsPage: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const leadId = useMemo(() => (params.id ? String(params.id) : ''), [params.id]);

  const { data, isLoading } = useGetLeadQuery(leadId);

  const leadTabs = useLeadTabs({ leadId });

  const projectTabsElement = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName="bg-gray-7 p-7 flex-auto"
        items={leadTabs}
      />
    ),
    [leadTabs],
  );

  return (
    <TabLayout tabs={!isLoading && data && projectTabsElement}>
      {isLoading && <Loader full colorful />}
      {!isLoading && data && (
        <div className="bg-white">
          <div className="flex items-center justify-between px-7 pt-7 gap-6">
            <div className="flex items-center gap-4">
              <Button
                variant={ButtonVariant.SECONDARY}
                withIcon="left-arrow"
                onClick={() => navigate(-1)}
              />
              <div className="flex flex-col w-[65vw]">
                <h2 className="text-h4 font-bold break-words leading-6">{data.name}</h2>
                <span className="text-p5 text-gray-2">
                  Created {format(new Date(data?.createdAt), DateFormat.D_MMM_Y)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </TabLayout>
  );
};
