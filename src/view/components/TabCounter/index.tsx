import clsx from 'clsx';
import React, { FC } from 'react';

interface Props {
  value: number;
}

export const TabCounter: FC<Props> = ({ value }) => {
  return (
    <div>
      {value > 0 && (
        <div
          className={clsx(
            'ml-1 flex items-center justify-center bg-red text-white h-5 rounded-xl',
            {
              'w-5': value < 10,
              'w-7': value >= 10 && value <= 99,
              'w-9': value > 99,
            },
          )}
        >
          <span>{value > 99 ? '99+' : value}</span>
        </div>
      )}
    </div>
  );
};
