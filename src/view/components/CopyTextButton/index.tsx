import clsx from 'clsx';
import React from 'react';

import { copyTextValue } from '~/utils/copyTextValue';
import { Icon } from '~/view/ui/components/common/Icon';

interface Props {
  size?: number;
  value: string;
  className?: string;
}

export const CopyTextButton: React.FC<Props> = ({ size = 12, value, className }) => {
  return (
    <button
      type="button"
      className={clsx('text-blue hover:opacity-70', className)}
      onClick={() => copyTextValue(value)}
    >
      <Icon name="copy" size={size} />
    </button>
  );
};
