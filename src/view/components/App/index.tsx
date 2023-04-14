import { useMountEffect } from '@appello/common/lib/hooks';
import { Toaster } from '@appello/web-ui';
import React, { useLayoutEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setUser } from '~/store/modules/user';
import { selectIsAuth } from '~/store/modules/user/selectors';
import { Router } from '~/view/components/Router';
import { ErrorBoundaryPage } from '~/view/pages/ErrorBoundary';

import { useCurrentUserLazyQuery } from './__generated__/schema';
import styles from './styles.module.scss';

export const App: React.FC = () => {
  const location = useLocation();
  const [getCurrentUser] = useCurrentUserLazyQuery();
  const isAuthorized = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  useMountEffect(() => {
    (async () => {
      if (isAuthorized) {
        const { data } = await getCurrentUser();
        if (data) {
          dispatch(setUser(data.me));
        }
      }
    })();
  });

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
