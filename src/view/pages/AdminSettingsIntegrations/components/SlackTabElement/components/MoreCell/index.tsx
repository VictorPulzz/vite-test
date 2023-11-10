import { useSwitchValue } from '@appello/common/lib/hooks';
import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { Dropdown, DropdownItem } from '@appello/web-ui';
import { Icon } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';
import {
  FetchSlackTemplatesListDocument,
  useDeleteSlackTemplateMutation,
} from '~/view/pages/AdminSettingsIntegrations/__generated__/schema';

import { SlackChannelTemplateResultType } from '../../types';
import { CreateOrUpdateChannelTemplateModal } from '../CreateOrUpdateChannelTemplateModal';

export const MoreCell: FC<CellContext<SlackChannelTemplateResultType, unknown>> = ({ row }) => {
  const { id, label } = row.original;

  const {
    value: isCreateOrUpdateChannelTemplateModal,
    on: openCreateOrUpdateChannelTemplateModal,
    off: closeCreateOrUpdateChannelTemplateModal,
  } = useSwitchValue(false);

  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const [slackTemplateDelete] = useDeleteSlackTemplateMutation();

  const removeSlackTemplateDelete = useCallback(() => {
    return toast.promise(
      slackTemplateDelete({
        variables: {
          input: { id },
        },
        refetchQueries: [FetchSlackTemplatesListDocument],
      }),
      {
        loading: 'Deleting channel template...',
        success: 'Channel template deleted',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while deleting channel template: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [id, slackTemplateDelete]);

  const options: DropdownItem[] = [
    {
      label: 'Edit',
      iconBefore: <Icon name="edit" size={14} />,
      onSelect: openCreateOrUpdateChannelTemplateModal,
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
      <Dropdown containerWidth="14.93rem" items={options}>
        {({ onClick }) => (
          <button type="button" onClick={onClick}>
            <Icon name="menu" size={16} />
          </button>
        )}
      </Dropdown>
      {isCreateOrUpdateChannelTemplateModal && (
        <CreateOrUpdateChannelTemplateModal
          channelTemplateId={id}
          close={closeCreateOrUpdateChannelTemplateModal}
          isOpen={isCreateOrUpdateChannelTemplateModal}
        />
      )}
      {isConfirmActionModal && (
        <ConfirmActionModal
          action="delete"
          close={closeConfirmActionModal}
          description="All created channels will remain but no one will be able to create new channels with this template"
          isOpen={isConfirmActionModal}
          name={label ?? ''}
          onAccept={removeSlackTemplateDelete}
        />
      )}
    </>
  );
};
