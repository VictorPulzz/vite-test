import { CellContext } from '@tanstack/table-core';
import React, { FC, useMemo } from 'react';
import { Dropdown, DropdownItem } from 'react-nested-dropdown';

import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';

import { ChannelTemplatesType } from '../../consts';
import styles from './styles.module.scss';

interface Props {
  ctx: CellContext<
    ChannelTemplatesType,
    {
      id: number;
      photo: string;
      fullName: string;
    }[]
  >;
}

export const InitialUsersCell: FC<Props> = ({ ctx }) => {
  const allUsers = ctx.getValue();
  const visibleUsersCount = 4;
  const firstFourUsers = useMemo(() => [...ctx.getValue()].splice(0, visibleUsersCount), [ctx]);
  const hiddenUsersCount = allUsers.length - visibleUsersCount;

  const options: DropdownItem[] = allUsers.map(user => ({
    label: user.fullName,
    iconBefore: <Avatar uri={user.photo || photoPlaceholder} size={24} />,
    className: 'flex item-center gap-2',
  }));

  return (
    <div className="flex ">
      {firstFourUsers.map((user, index) => (
        <div
          key={user.id + index}
          className="border-solid border-[3px] border-white rounded-[50%] ml-[-10px]"
        >
          <Avatar uri={user.photo || photoPlaceholder} size={32} />
        </div>
      ))}
      {allUsers.length > 4 && (
        <Dropdown items={options} containerWidth="14.93rem" className={styles['dropdown']}>
          {({ onClick }) => (
            <div className="flex items-center justify-center w-[38px] h-[38px] bg-[#E9F3FC] border-solid border-[3px] border-white rounded-[50%] ml-[-10px] cursor-pointer">
              <button
                type="button"
                onClick={onClick}
                className="text-blue text-c1 font-medium p-[30px]"
              >
                +{hiddenUsersCount}
              </button>
            </div>
          )}
        </Dropdown>
      )}
    </div>
  );
};
