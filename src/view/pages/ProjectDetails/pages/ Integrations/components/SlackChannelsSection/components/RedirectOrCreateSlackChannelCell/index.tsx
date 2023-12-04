import { useSwitchValue } from '@appello/common';
import { getGqlError } from '@appello/services/dist/gql';
import { Button, ButtonVariant } from '@appello/web-ui';
import { CellContext } from '@tanstack/table-core';
import React, { FC, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';
import {
  FetchProjectIntegrationsDocument,
  useCreateProjectSlackChannelMutation,
} from '~/view/pages/ProjectDetails/__generated__/schema';
import { ProjectSlackChannelResultType } from '~/view/pages/ProjectDetails/types';

interface Props {
  ctx: CellContext<ProjectSlackChannelResultType, unknown>;
}

export const RedirectOrCreateSlackChannelCell: FC<Props> = ({ ctx }) => {
  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const { template, channelUrl, channelId, templateName } = ctx.row.original;

  const [createProjectSlackChannel] = useCreateProjectSlackChannelMutation();

  const сreateSlackChannel = useCallback(() => {
    return toast.promise(
      createProjectSlackChannel({
        variables: {
          input: { projectId, channelTemplate: { prefix: template?.prefix ?? '' } },
        },
        refetchQueries: [FetchProjectIntegrationsDocument],
      }),
      {
        loading: 'Creating slack channel...',
        success: 'Slack channel succesfully created',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `${errors?.explain?.non_field}`;
        },
      },
    );
  }, [createProjectSlackChannel, projectId, template?.prefix]);

  const goToSlackChannel = useCallback(() => {
    if (channelUrl) {
      window.open(channelUrl, '_blank');
    }
  }, [channelUrl]);

  return (
    <>
      <Button
        label={channelId ? 'Slack' : 'Create'}
        variant={channelId ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
        onClick={channelId ? goToSlackChannel : openConfirmActionModal}
      />
      {isConfirmActionModal && (
        <ConfirmActionModal
          action="create"
          close={closeConfirmActionModal}
          icon="add"
          isOpen={isConfirmActionModal}
          name={template?.label || templateName || ''}
          onAccept={сreateSlackChannel}
        />
      )}
    </>
  );
};
