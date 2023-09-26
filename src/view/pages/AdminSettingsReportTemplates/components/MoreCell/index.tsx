import { useSwitchValue } from '@appello/common/lib/hooks';
import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';
import { generatePath } from 'react-router';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';

import {
  FetchReportTemplatesListDocument,
  useRemoveReportTemplateMutation,
} from '../../__generated__/schema';
import { ReportTemplatesResultType } from '../../types';

export const MoreCell: FC<CellContext<ReportTemplatesResultType, unknown>> = ({ row }) => {
  const navigate = useNavigate();
  const { name, id } = row.original;

  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const [removeReportTemplate] = useRemoveReportTemplateMutation();

  const removeCurrentReportTemplate = useCallback(() => {
    return toast.promise(
      removeReportTemplate({
        variables: {
          input: { id },
        },
        refetchQueries: [FetchReportTemplatesListDocument],
      }),
      {
        loading: 'Deleting report template...',
        success: 'Report template deleted',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while deleting report template: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [id, removeReportTemplate]);

  const options: DropdownItem[] = [
    {
      label: 'Edit',
      iconBefore: <Icon name="pencil" size={14} />,
      onSelect: () => navigate(generatePath(ROUTES.ADMIN_SETTINGS_REPORT_TEMPLATES_EDIT, { id })),
    },
    {
      label: 'Delete',
      iconBefore: <Icon name="trash" size={14} />,
      onSelect: openConfirmActionModal,
      className: 'text-red',
    },
  ];

  return (
    <>
      <Dropdown items={options} containerWidth="14.93rem">
        {({ onClick }) => (
          <button type="button" onClick={onClick}>
            <Icon name="menu" size={16} />
          </button>
        )}
      </Dropdown>
      {isConfirmActionModal && (
        <ConfirmActionModal
          name={name}
          action="delete"
          isOpen={isConfirmActionModal}
          close={closeConfirmActionModal}
          onAccept={removeCurrentReportTemplate}
        />
      )}
    </>
  );
};
