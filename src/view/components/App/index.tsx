import { Toaster } from '@ui/components/common/Toaster';
import React, { useLayoutEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

import { Router } from '~/view/components/Router';
import { ErrorBoundaryPage } from '~/view/pages/ErrorBoundary';

import styles from './styles.module.scss';

export const App: React.FC = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main className={styles['app-wrapper']}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryPage}>
        <Router />
      </ErrorBoundary>
      <Toaster />
    </main>
  );
};
