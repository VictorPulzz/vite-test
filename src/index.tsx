import './view/styles/global.scss';

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { gqlClient } from '~/services/gql';
import { persistor, store } from '~/store';
import { App } from '~/view/components/App';

const CONTAINER_SELECTOR = 'root';

const container = document.getElementById(CONTAINER_SELECTOR);

if (!container) {
  throw new Error(`Element with id "${CONTAINER_SELECTOR}" not found`);
}

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ApolloProvider client={gqlClient}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
