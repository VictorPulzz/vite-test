import React, { FC, useMemo } from 'react';

import { useFilterByUserForm } from '~/view/pages/ProjectDetails//hooks/useFilterByUserForm';
import { useFetchAllUsersQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { Table } from '~/view/ui/components/common/Table';
import { SelectField } from '~/view/ui/components/form/SelectField';

import { HISTORY_TABLE_COLUMNS } from './consts';

// TODO remove HistoryUsersType when backend will be ready
export type HistoryUsersType = {
  id: number;
  action: string;
  madeBy: string;
  dateAndTime: string;
};

// TODO remove historyTestData when backend will be ready
const historyTestData = [
  {
    id: 1,
    action: 'Added new current team member',
    madeBy: 'Alex C.',
    dateAndTime: '28 May 2022, 8:22 pm',
  },
  {
    id: 2,
    action: 'Added new current team member',
    madeBy: 'Alex C.',
    dateAndTime: '28 May 2022, 8:22 pm',
  },
];

export const History: FC = () => {
  const { form } = useFilterByUserForm();

  const { data } = useFetchAllUsersQuery({
    variables: {
      pagination: {},
    },
    fetchPolicy: 'cache-and-network',
  });

  const usersOptions = useMemo(() => {
    if (data?.usersList.results) {
      return data?.usersList.results.map(({ id, fullName }) => ({
        value: String(id),
        label: fullName,
      }));
    }
    return [];
  }, [data?.usersList.results]);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="shadow-4 bg-white rounded-md p-7">
          <h2 className="text-p1 font-bold">History</h2>
          <SelectField
            name="user"
            options={usersOptions}
            control={form.control}
            label=""
            className="w-64 mt-3"
            placeholder="Filter by user"
          />
          <Table className="mt-4" data={historyTestData} columns={HISTORY_TABLE_COLUMNS} />
        </div>
      </div>
    </div>
  );
};
