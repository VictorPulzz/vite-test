import { Icon } from '@appello/web-ui';
import clsx from 'clsx';
import React from 'react';

import { copyTextValue } from '~/utils/copyTextValue';

interface Props {
  size?: number;
  value: string;
  className?: string;
}

export const CopyTextButton: React.FC<Props> = ({ size = 12, value, className }) => {
  return (
    <button
      className={clsx('text-blue hover:opacity-70', className)}
      type="button"
      onClick={() => copyTextValue(value)}
    >
      <Icon name="copy" size={size} />
    </button>
  );
};
