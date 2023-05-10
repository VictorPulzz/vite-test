import React, { FC } from 'react';

import comingSoon from '~/view/assets/images/coming-soon.svg';

export const Overview: FC = () => {
  return (
    <div className="flex justify-center items-center h-[calc(70vh+2rem)]">
      <img src={comingSoon} alt="feature" />
    </div>
  );
};
