import './view/styles/global.scss';

import { Api } from '@appello/common/lib/services/api';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { API_URL, REFRESH_TOKEN_URL } from '~/constants/env';
import { persistor, store } from '~/store';
import { setAuth, signOut } from '~/store/modules/user';
import { App } from '~/view/components/App';

const CONTAINER_SELECTOR = 'root';

const container = document.getElementById(CONTAINER_SELECTOR);

if (!container) {
  throw new Error(`Element with id "${CONTAINER_SELECTOR}" not found`);
}

const root = createRoot(container);

Api.initialize({
  apiUrl: API_URL,
  refreshTokenUrl: REFRESH_TOKEN_URL,
  getToken: () => store.getState().user.auth?.access,
  getRefreshToken: () => store.getState().user.auth?.refresh,
  onTokenRefreshSuccess: data => store.dispatch(setAuth(data)),
  onTokenRefreshError: () => store.dispatch(signOut()),
});

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
