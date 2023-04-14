import { Tabs } from '@appello/web-ui';
import React, { FC, useMemo } from 'react';

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
