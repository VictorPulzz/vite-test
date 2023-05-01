import React, { FC } from 'react';

import comingSoon from '~/view/assets/images/coming-soon.svg';

export const Reports: FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center items-center h-[calc(70vh+2rem)]">
        <img src={comingSoon} alt="feature" />
      </div>
    </div>
  );
};
