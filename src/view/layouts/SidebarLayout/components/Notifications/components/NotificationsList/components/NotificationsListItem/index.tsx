import { useMountEffect } from '@appello/common/lib/hooks';
import clsx from 'clsx';
import { format } from 'date-fns';
import React, { FC, useRef } from 'react';

import { DateFormat } from '~/constants/dates';
import { NotificationType } from '~/services/gql/__generated__/globalTypes';

interface Props {
  notification: NotificationType;
  addReadNotifications(id: number): void;
  rootContainer: Nullable<HTMLDivElement>;
  isNew: boolean;
}

export const NotificationsListItem: FC<Props> = ({
  notification,
  addReadNotifications,
  rootContainer,
  isNew,
}) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  useMountEffect(() => {
    const options = {
      root: rootContainer,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && notification.isNew) {
          addReadNotifications(notification.id);
        }
      });
    }, options);

    if (notificationRef.current) {
      observer.observe(notificationRef.current);
    }

    return () => {
      if (notificationRef.current) {
        observer.unobserve(notificationRef.current);
      }
    };
  });

  return (
    <div
      className={clsx(
        'flex items-center gap-3 p-4 border-solid border-b border-gray-5 last:border-b-0',
        isNew ? 'bg-gray-1/5' : 'bg-white',
      )}
      ref={notificationRef}
    >
      {isNew && <div className="w-[7px] h-[7px] bg-red rounded shrink-0" />}
      <div className={clsx('flex flex-col gap-1', !isNew && 'ml-[19px]')}>
        <span className="text-p5">{notification.message}</span>
        <span className="text-p6 text-gray-1 ">
          {format(new Date(notification.createdAt), DateFormat.PP_P)}
        </span>
      </div>
    </div>
  );
};
