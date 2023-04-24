import React, { FC } from 'react';

import comingSoon from '~/view/assets/images/coming-soon.svg';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';

// TODO when back will be ready
/* const requests = {
  id: '0',
  type: 'Access',
  assignedTo: 'Katy Adams',
  createdBy: 'Daniel Collins',
  createdAt: '28 May 2022',
  dueDate: '28 May 2022',
}; */

export const RequestsPage: FC = () => {
  // const statusOptions = [ALL_SELECT_OPTION, ...enumToSelectOptions({})];

  // const requestsData = new Array(5).fill(requests);

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-center items-center flex-auto ">
        <img src={comingSoon} alt="feature" />
      </div>
      {/* <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Requests</h1>
          <p className="text-p5 text-gray-2">0 requests in total</p>
        </div>
        <Button
          label="New request"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
        />
      </div>
      <div className="mt-5 flex gap-3">
        <SearchInput onChange={() => null} placeholder="Search requests" className="flex-1" />
        <Select
          className="w-40"
          options={statusOptions}
          // value={filter?.status}
          placeholder="Status"
          // onChange={value => setFilter({ status: value })}
        />
      </div>
      <Table
        className="mt-6"
        data={requestsData}
        columns={REQUESTS_TABLE_COLUMNS}
        // setOffset={setOffset}
        // offset={offset}
        // fetchMore={fetchMore}
        totalCount={12}
      /> */}
    </SidebarLayout>
  );
};
