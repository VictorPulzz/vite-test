import { useSwitchValue } from '@appello/common';
import { useClickAway } from '@appello/web-kit';
import { Icon } from '@appello/web-ui';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { NOTIFICATIONS_PAGE_SIZE } from '~/constants/pagination';

import {
  useFetchNotificationsListQuery,
  useUpdateNotificationsListMutation,
} from '../../__generated__/schema';
import { NotificationsList } from './components/NotificationsList';

export const Notifications: FC = () => {
  const {
    value: isNotificationsOpen,
    off: closeNotifications,
    toggle: toggleNotifications,
  } = useSwitchValue(false);

  const { ref: containerRef } = useClickAway<HTMLDivElement>(closeNotifications);

  const [isShowUnreadNotifications, setIsShowUnreadNotifications] = useState<boolean>(false);
  const [nextOffset, setNextOffset] = useState<number>(0);

  const [currentNotifications, setCurrentNotifications] = useState<number[]>([]);

  const [debouncedCurrentNotifications] = useDebounce(currentNotifications, 1500);

  const addReadNotifications = useCallback((id: number) => {
    setCurrentNotifications(state => (state.includes(id) ? state : [...state, id]));
  }, []);

  const [readNotifications] = useUpdateNotificationsListMutation();

  const { data, fetchMore } = useFetchNotificationsListQuery({
    variables: {
      pagination: {
        limit: NOTIFICATIONS_PAGE_SIZE,
        offset: 0,
      },
      filters: { isNew: isShowUnreadNotifications ? true : null },
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    setCurrentNotifications([]);
  }, [isShowUnreadNotifications]);

  useEffect(() => {
    if (!isNotificationsOpen) {
      readNotifications({
        variables: {
          input: debouncedCurrentNotifications,
        },
      });
    }
  }, [debouncedCurrentNotifications, isNotificationsOpen, readNotifications]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        className="bg-white/10 p-2 rounded text-white/50"
        type="button"
        onClick={toggleNotifications}
      >
        <Icon name="notification" size={18} />
      </button>
      {data && data?.notificationList.newCount > 0 && (
        <div className="absolute top-[-5px] right-[-5px] w-[10px] h-[10px] bg-red rounded-lg shrink-0" />
      )}
      {isNotificationsOpen && data && (
        <NotificationsList
          addReadNotifications={addReadNotifications}
          currentNotifications={currentNotifications}
          debouncedCurrentNotifications={debouncedCurrentNotifications}
          isShowUnreadNotifications={isShowUnreadNotifications}
          nextOffset={nextOffset}
          notifications={data?.notificationList.results}
          setIsShowUnreadNotifications={setIsShowUnreadNotifications}
          setNextOffset={setNextOffset}
          onPageChange={fetchMore}
        />
      )}
    </div>
  );
};
