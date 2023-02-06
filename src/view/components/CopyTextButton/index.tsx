import clsx from 'clsx';
import React from 'react';
import toast from 'react-hot-toast';

import { Icon } from '~/view/ui/components/common/Icon';

interface Props {
  size?: number;
  value: string;
  className?: string;
}

export const CopyTextButton: React.FC<Props> = ({ size = 12, value, className }) => {
  const copyFieldValue = (field: string): void => {
    navigator.clipboard.writeText(field);
    if (field) {
      toast.success('Copied');
    }
  };
  return (
    <button
      type="button"
      className={clsx('text-blue hover:opacity-70', className)}
      onClick={() => copyFieldValue(value)}
    >
      <Icon name="copy" size={size} />
    </button>
  );
};
