import { useSwitchValue } from '@appello/common/lib/hooks/useSwitchValue';
import { getGqlError } from '@appello/common/lib/services/gql/utils';
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
          return `Error while creating slack channel: ${JSON.stringify(errors)}`;
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
        onClick={channelId ? goToSlackChannel : openConfirmActionModal}
        variant={channelId ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
        label={channelId ? 'Slack' : 'Create'}
      />
      {isConfirmActionModal && (
        <ConfirmActionModal
          name={template?.label || templateName || ''}
          icon="add"
          action="create"
          isOpen={isConfirmActionModal}
          close={closeConfirmActionModal}
          onAccept={сreateSlackChannel}
        />
      )}
    </>
  );
};
