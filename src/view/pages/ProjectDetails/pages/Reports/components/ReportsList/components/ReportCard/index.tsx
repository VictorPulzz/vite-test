import { Button, ButtonVariant } from '@appello/web-ui';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import React, { FC } from 'react';

// TODO remove HistoryUsersType when backend will be ready
type ReportsProps = {
  reportName: string;
  reportDate: string;
  reportedBy: string;
};

const options: DropdownItem[] = [
  {
    label: 'Options',
    onSelect: () => {},
  },
];

export const ReportsCard: FC<ReportsProps> = ({ reportName, reportDate, reportedBy }) => {
  return (
    <div className="flex justify-between px-6 py-4 border-solid border border-gray-5 rounded-md mt-4">
      <div>
        <p className="font-medium mt-1">{reportName}</p>
        <p className="text-p5 mt-1 text-gray-1">
          {reportDate} {reportedBy}
        </p>
      </div>
      <div className="flex gap-2.5 items-center">
        <Button
          variant={ButtonVariant.SECONDARY}
          label="View"
          onClick={() => null}
          className="w-[102px]"
        />
        <div className="flex justify-center items-center w-10 h-10 bg-gray-7 border-solid border border-gray-5 rounded-md">
          <Dropdown items={options} containerWidth="14.93rem">
            {({ onClick }) => (
              <button type="button" onClick={onClick}>
                <Icon name="menu" size={16} />
              </button>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
