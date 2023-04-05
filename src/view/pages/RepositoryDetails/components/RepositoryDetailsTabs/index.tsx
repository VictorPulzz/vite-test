import React, { FC, useMemo } from 'react';

import { Tabs } from '~/view/ui/components/common/Tabs';

import { Participants } from './components/Partisipants';
import styles from './styles.module.scss';

export const RepositoryDetailsTabs: FC = () => {
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
  return <div className="shadow-4 bg-white rounded-md flex-auto">{RepositoryDetailsTabs}</div>;
};
