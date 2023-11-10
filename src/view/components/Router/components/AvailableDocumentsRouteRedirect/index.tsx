import React, { FC, useMemo } from 'react';
import { Navigate } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

import { NoAccessMessage } from '../../../NoAccessMessage';

export const AvailableDocumentsRouteRedirect: FC = () => {
  const { canReadWriteInternalDocuments, canReadWriteClientsDocuments } = useUserPermissions();

  const availableDocumentsRoutes = useMemo(
    () =>
      [
        canReadWriteInternalDocuments && ROUTES.DOCUMENTS_INTERNAL,
        canReadWriteClientsDocuments && ROUTES.DOCUMENTS_CLIENT,
      ].filter((route): route is string => !!route),
    [canReadWriteClientsDocuments, canReadWriteInternalDocuments],
  );

  return availableDocumentsRoutes.length > 0 ? (
    <Navigate replace to={availableDocumentsRoutes[0]} />
  ) : (
    <NoAccessMessage />
  );
};
