import clsx from 'clsx';
import React, { FC } from 'react';

import { Icon } from '~/view/ui/components/common/Icon';

interface Props {
  className?: string;
}

export const NoAccessMessage: FC<Props> = ({ className }) => {
  return (
    <div className={clsx('flex flex-col items-center justify-center', className)}>
      <div className="p-10 rounded-full bg-blue/10 mb-2">
        <Icon name="lock" size={25} className="m-auto text-blue" />
      </div>
      <h1 className="text-h4">You have no access to this section</h1>
    </div>
  );
};
