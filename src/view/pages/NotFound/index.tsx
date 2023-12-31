import { Button, ButtonSize, ButtonVariant } from '@appello/web-ui';
import React from 'react';

import { ROUTES } from '~/constants/routes';
import logo from '~/view/assets/images/logo.svg';

import styles from './styles.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles['container']}>
      <img alt="Logo" className={styles['logo']} src={logo} />
      <div className="flex-1 flex-center flex-col">
        <h1 className="text-h1 text-white text-center">Page not found</h1>
        <p className="text-p4 text-white/80 text-center mt-2">
          Hmm, the page you were looking for doesn’t seem to exist.
        </p>
        <Button
          className="mt-6 w-48"
          label="Go to home page"
          size={ButtonSize.LARGE}
          to={ROUTES.HOME}
          variant={ButtonVariant.PRIMARY}
        />
      </div>
    </div>
  );
};
