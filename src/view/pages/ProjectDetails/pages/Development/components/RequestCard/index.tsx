import { IconContainer } from '@appello/web-ui';
import React, { FC } from 'react';

import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';

interface Props {
  title: string;
  icon: string;
}

export const RequestCard: FC<Props> = ({ title, icon }) => {
  return (
    <div className="py-20 flex items-center justify-center border-solid border border-red/40 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconContainer
            className="w-10 h-10 bg-red/10"
            iconClassName="w-5 h-5 text-red"
            name={icon}
          />
          <div>
            <h2 className="text-p4 font-medium">{convertUppercaseToReadable(title)}</h2>
            <span className="text-p5 text-red font-medium">Requested</span>
          </div>
        </div>
      </div>
    </div>
  );
};
