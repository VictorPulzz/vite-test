import React, { FC, useMemo } from 'react';
import { Navigate } from 'react-router';

import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { useHasAccess } from '~/view/hooks/useHasAccess';

import { NoAccessMessage } from '../../../NoAccessMessage';

export const AvailableDocumentsRouteRedirect: FC = () => {
  const canReadWriteInternalDocuments = useHasAccess(Permission.READ_WRITE_INTERNAL_DOCS);
  const canReadWriteClientsDocuments = useHasAccess(Permission.READ_WRITE_CLIENTS_DOCS);

  const availableDocumentsRoutes = useMemo(
    () =>
      [
        canReadWriteInternalDocuments && ROUTES.DOCUMENTS_INTERNAL,
        canReadWriteClientsDocuments && ROUTES.DOCUMENTS_CLIENT,
      ].filter((route): route is string => !!route),
    [canReadWriteClientsDocuments, canReadWriteInternalDocuments],
  );

  return availableDocumentsRoutes.length > 0 ? (
    <Navigate to={availableDocumentsRoutes[0]} replace />
  ) : (
    <NoAccessMessage />
  );
};
