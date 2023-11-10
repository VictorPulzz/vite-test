import { Nullable } from '@appello/common';
import { Icon } from '@appello/web-ui';
import React from 'react';

interface Props {
  uri?: Nullable<string>;
  size?: number;
}

export const Avatar: React.FC<Props> = ({ uri, size = 34 }) => {
  return (
    <div className="flex-shrink-0">
      {uri ? (
        <img
          alt="avatar"
          className="rounded-full object-cover"
          src={uri}
          style={{ width: size, height: size }}
        />
      ) : (
        <Icon name="photoPlaceholder" size={size * 0.58} />
      )}
    </div>
  );
};
