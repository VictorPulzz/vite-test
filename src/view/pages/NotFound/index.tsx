import { Button, ButtonSize, ButtonVariant } from '@ui/components/common/Button';
import { Text, TextVariant } from '@ui/components/common/Text';
import React from 'react';

import { ROUTES } from '~/constants/routes';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-primary flex-center flex-col flex-1 pt-12">
      <div className="flex-1 flex-center flex-col">
        <Text variant={TextVariant.H1} className="text-white text-center">
          Page not found
        </Text>
        <Text variant={TextVariant.P4} className="text-white/80 text-center mt-2">
          Hmm, the page you were looking for doesn’t seem to exist.
        </Text>
        <Button
          variant={ButtonVariant.PRIMARY}
          label="Go to home page"
          to={ROUTES.HOME}
          className="mt-6 !w-48"
          size={ButtonSize.LARGE}
        />
      </div>
    </div>
  );
};
