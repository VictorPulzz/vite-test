import React from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

interface Props {
  uri?: Nullable<string>;
  size?: number;
}

export const Avatar: React.FC<Props> = ({ uri, size = 34 }) => {
  return (
    <div>
      {uri ? (
        <img
          src={uri}
          alt="avatar"
          className="rounded-full object-cover"
          style={{ width: size, height: size }}
        />
      ) : (
        <Icon name="photoPlaceholder" size={size * 0.58} />
      )}
    </div>
  );
};
