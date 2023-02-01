import React, { FC } from 'react';

import { Table } from '~/view/ui/components/common/Table';
import { SelectField } from '~/view/ui/components/form/SelectField';

import { HISTORY_TABLE_COLUMNS } from './consts';
import { useFilterByUserForm } from './hooks/useFilterByUserForm';

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
  const {
    form: { control },
  } = useFilterByUserForm();

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="shadow-4 bg-white rounded-md p-7">
          <h2 className="text-p1 font-bold">History</h2>
          <SelectField
            name="user"
            options={[]}
            control={control}
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
