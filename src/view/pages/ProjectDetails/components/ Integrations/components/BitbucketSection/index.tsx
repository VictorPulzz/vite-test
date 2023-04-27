import { Button, ButtonVariant } from '@appello/web-ui';
import React, { FC } from 'react';

import bitbucket from '~/view/assets/images/bitbucket.svg';
import { SectionContainer } from '~/view/components/SectionContainer';

export const BitbucketSection: FC = () => {
  return (
    <SectionContainer containerClassName="h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={bitbucket}
            alt="bitbucket"
            className="w-[46px] h-[46px] bg-blue/10 p-3 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-p1 font-bold">Bitbucket</span>
            <span className="text-p6 text-gray-1">Not connected</span>
          </div>
        </div>
        <Button
          variant={ButtonVariant.PRIMARY}
          label="Connect"
          withIcon="cloudConnection"
          onClick={() => null}
          className="w-[140px]"
        />
        {/* <Icon name="check" className="text-green" size={24} /> */}
      </div>
    </SectionContainer>
  );
};
