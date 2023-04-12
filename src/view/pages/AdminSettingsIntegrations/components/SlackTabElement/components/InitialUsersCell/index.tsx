import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback, useMemo } from 'react';
import { Dropdown, DropdownItem } from 'react-nested-dropdown';
import { generatePath, useNavigate } from 'react-router-dom';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useHasAccess } from '~/view/hooks/useHasAccess';

import { SlackChannelTemplateResultType } from '../../types';
import { UserNameTooltip } from './components/UserNameTooltip';
import styles from './styles.module.scss';

const VISIBLE_USERS_COUNT = 4;

export const InitialUsersCell: FC<CellContext<SlackChannelTemplateResultType, unknown>> = ({
  row,
}) => {
  const navigate = useNavigate();

  const canReadUserDetails = useHasAccess(Permission.READ_USER_DETAILS);

  const { initialUsers } = row.original;

  const hiddenUsersCount = initialUsers && initialUsers.length - VISIBLE_USERS_COUNT;

  const firstFourUsers = useMemo(
    () => (initialUsers ? [...initialUsers].splice(0, VISIBLE_USERS_COUNT) : []),
    [initialUsers],
  );
  const hiddenUsers = useMemo(
    () => (initialUsers ? [...initialUsers].slice(VISIBLE_USERS_COUNT) : []),
    [initialUsers],
  );

  const showUserDetails = useCallback(
    (id: string): void => {
      if (canReadUserDetails) {
        navigate(
          generatePath(ROUTES.USER_DETAILS, {
            id,
          }),
        );
      }
    },
    [canReadUserDetails, navigate],
  );

  const options: DropdownItem[] = useMemo(
    () =>
      hiddenUsers
        ? hiddenUsers?.map(user => ({
            label: `${user.fullName}`,
            iconBefore: <Avatar uri={user.photo?.url || photoPlaceholder} size={24} />,
            className: 'flex item-center gap-2',
            onSelect: () => showUserDetails(user.id ?? ''),
          }))
        : [],
    [hiddenUsers, showUserDetails],
  );

  return (
    <div className="flex ">
      {firstFourUsers?.map(user => (
        <div
          key={user.id}
          className="group relative border-solid border-[3px] border-white rounded-[50%] ml-[-10px] cursor-pointer"
        >
          <Avatar uri={user.photo?.url || photoPlaceholder} size={32} />
          <UserNameTooltip userName={user?.fullName ?? ''} />
        </div>
      ))}
      {initialUsers && initialUsers.length > 4 && (
        <Dropdown items={options} containerWidth="14.93rem" className={styles['dropdown']}>
          {({ onClick, isOpen }) => (
            <div
              className={`flex items-center justify-center w-[38px] h-[38px] ${
                isOpen ? 'bg-blue' : 'bg-[#E9F3FC]'
              } border-solid border-[3px] border-white rounded-[50%] ml-[-10px] cursor-pointer`}
            >
              <button
                type="button"
                onClick={onClick}
                className={`${isOpen ? 'text-white' : 'text-blue '} text-c1 font-medium p-[5px]`}
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
