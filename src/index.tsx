import './view/styles/tailwind.scss';
import '@appello/web-ui/dist/index.css';
import './view/styles/global.scss';

import { ApolloProvider } from '@apollo/client';
import {
  AppelloKit,
  AppelloKitComponents,
  AppelloKitComponentsProvider,
  AppelloKitProvider,
} from '@appello/web-ui';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { z } from 'zod';

import { DATE_FORMAT } from '~/constants/dates';
import { formErrors } from '~/constants/form';
import { PAGE_SIZE } from '~/constants/pagination';
import { DEBOUNCE_DELAY } from '~/constants/timing';
import { gqlClient } from '~/services/gql';
import { persistor, store } from '~/store';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { App } from '~/view/components/App';

const CONTAINER_SELECTOR = 'root';

const container = document.getElementById(CONTAINER_SELECTOR);

if (!container) {
  throw new Error(`Element with id "${CONTAINER_SELECTOR}" not found`);
}

const root = createRoot(container);

z.setErrorMap((issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.minimum === 1) {
      return { message: formErrors.REQUIRED };
    }
  }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === 'email') {
      return { message: formErrors.INVALID_EMAIL };
    }
  }
  // todo: add more default messages
  return { message: ctx.defaultError };
});

const defaultTheme: Partial<AppelloKit> = {
  pageSize: PAGE_SIZE,
  debounceDelay: DEBOUNCE_DELAY,
  dateFormat: DATE_FORMAT,
};

const defaultComponentProps: AppelloKitComponents = {
  PhotoField: {
    photoPlaceholder,
  },
  Table: {
    pageSize: PAGE_SIZE,
  },
};

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ApolloProvider client={gqlClient}>
            <AppelloKitProvider value={defaultTheme}>
              <AppelloKitComponentsProvider value={defaultComponentProps}>
                <App />
              </AppelloKitComponentsProvider>
            </AppelloKitProvider>
          </ApolloProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
