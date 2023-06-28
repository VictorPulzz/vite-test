import { FetchMoreQueryOptions } from '@apollo/client';
import { EmptyState, Loader } from '@appello/web-ui';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { NOTIFICATIONS_PAGE_SIZE } from '~/constants/pagination';

import {
  FetchNotificationsListDocument,
  FetchNotificationsListQuery,
  useUpdateNotificationsListMutation,
} from '../../../../__generated__/schema';
import { NotificationsListItem } from './components/NotificationsListItem';
import styles from './styles.module.scss';

interface Props {
  notifications: FetchNotificationsListQuery['notificationList']['results'];
  addReadNotifications(id: number): void;
  setNextOffset(id: number): void;
  isShowUnreadNotifications: boolean;
  nextOffset: number;
  debouncedCurrentNotifications: number[];
  currentNotifications: number[];
  setIsShowUnreadNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onPageChange: (
    options: FetchMoreQueryOptions<any> & {
      updateQuery?: (
        previousQueryResult: any,
        options: {
          fetchMoreResult: any;
          variables: any;
        },
      ) => any;
    },
  ) => Promise<unknown>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export const NotificationsList: FC<Props> = ({
  notifications,
  addReadNotifications,
  isShowUnreadNotifications,
  setIsShowUnreadNotifications,
  onPageChange,
  nextOffset,
  setNextOffset,
  debouncedCurrentNotifications,
  currentNotifications,
}) => {
  const notificationsListRef = useRef<HTMLDivElement>(null);

  const [isFetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    setNextOffset(notifications.length);
  }, [notifications.length, setNextOffset]);

  useEffect(() => {
    if (!notificationsListRef.current) {
      return () => {};
    }

    const handleScroll = async (e: Event): Promise<void> => {
      const element = e.target as HTMLElement;
      const isBottomReached = element.scrollTop + element.clientHeight >= element.scrollHeight;
      if (isBottomReached) {
        try {
          setFetching(true);
          await onPageChange({
            variables: {
              pagination: {
                limit: NOTIFICATIONS_PAGE_SIZE,
                offset: nextOffset,
              },
              filters: { isNew: isShowUnreadNotifications ? true : null },
            },
            updateQuery: (previousResult, { fetchMoreResult }) => ({
              notificationList: {
                newCount: fetchMoreResult.notificationList.newCount,
                results: [
                  ...previousResult.notificationList.results,
                  ...fetchMoreResult.notificationList.results,
                ],
              },
            }),
          });
        } finally {
          setFetching(false);
        }
      }
    };

    notificationsListRef.current.addEventListener('scroll', handleScroll);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      notificationsListRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [onPageChange, isShowUnreadNotifications, nextOffset, notifications.length]);

  const [readNotifications] = useUpdateNotificationsListMutation();

  const handleNotificationsFilter = useCallback(async () => {
    await readNotifications({
      variables: {
        input: currentNotifications,
      },
      refetchQueries: [
        {
          query: FetchNotificationsListDocument,
          variables: {
            pagination: {
              limit: NOTIFICATIONS_PAGE_SIZE,
              offset: 0,
            },
            filters: { isNew: !isShowUnreadNotifications ? true : null },
          },
        },
      ],
    });
    setIsShowUnreadNotifications(state => !state);
  }, [
    currentNotifications,
    isShowUnreadNotifications,
    readNotifications,
    setIsShowUnreadNotifications,
  ]);

  return (
    <div className="w-[380px] bg-white shadow-5 rounded absolute left-[55px] top-[-7px] z-50 select-none">
      <div className="flex item-center p-4 justify-between border-solid border-b border-gray-5">
        <h2 className="text-p3font-medium">Notifications</h2>
        <button
          type="button"
          onClick={handleNotificationsFilter}
          className="text-p5 text-blue hover:underline"
        >
          {`Show ${isShowUnreadNotifications ? 'all' : 'unread'}`}
        </button>
      </div>
      <div className={styles['triangle']} />
      <div ref={notificationsListRef} className="flex flex-col h-[320px] overflow-auto">
        {notifications.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <EmptyState iconName="notification" label="No unread notifications here yet" />
          </div>
        )}
        {notifications.map(notification => (
          <NotificationsListItem
            key={notification.id}
            notification={notification}
            addReadNotifications={addReadNotifications}
            rootContainer={notificationsListRef.current}
            isNew={
              debouncedCurrentNotifications.includes(notification.id) ? false : notification.isNew
            }
          />
        ))}
      </div>
      <div className="absolute left-[170px] bottom-[5px] h-[15px] flex items-center justify-center">
        {isFetching && <Loader full colorful dotSize={8} />}
      </div>
    </div>
  );
};
