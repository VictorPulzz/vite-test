import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback, useMemo } from 'react';
import { Dropdown, DropdownItem } from 'react-nested-dropdown';
import { generatePath, useNavigate } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

import { SlackChannelTemplateResultType } from '../../types';
import { UserNameTooltip } from './components/UserNameTooltip';
import styles from './styles.module.scss';

const VISIBLE_USERS_COUNT = 4;

export const InitialUsersCell: FC<CellContext<SlackChannelTemplateResultType, unknown>> = ({
  row,
}) => {
  const navigate = useNavigate();

  const { canReadUserDetails } = useUserPermissions();

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
    (id: number): void => {
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
            iconBefore: <Avatar size={24} uri={user.photoThumbnail?.url || photoPlaceholder} />,
            className: 'flex item-center gap-2',
            onSelect: () => showUserDetails(user.id),
          }))
        : [],
    [hiddenUsers, showUserDetails],
  );

  return (
    <div className="flex ">
      {firstFourUsers?.map(user => (
        <div
          className="group relative border-solid border-[3px] border-white rounded-[50%] ml-[-10px] cursor-pointer"
          key={user.id}
        >
          <Avatar size={32} uri={user.photoThumbnail?.url || photoPlaceholder} />
          <UserNameTooltip userName={user?.fullName ?? ''} />
        </div>
      ))}
      {initialUsers && initialUsers.length > 4 && (
        <Dropdown className={styles['dropdown']} containerWidth="14.93rem" items={options}>
          {({ onClick, isOpen }) => (
            <div
              className={`flex items-center justify-center w-[38px] h-[38px] ${
                isOpen ? 'bg-blue' : 'bg-[#E9F3FC]'
              } border-solid border-[3px] border-white rounded-[50%] ml-[-10px] cursor-pointer`}
            >
              <button
                className={`${isOpen ? 'text-white' : 'text-blue '} text-p5 font-medium p-[5px]`}
                type="button"
                onClick={onClick}
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
