import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { CellContext } from '@tanstack/react-table';
import React, { FC, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { useCreateProjectSlackChannelMutation } from '~/view/pages/ProjectDetails/__generated__/schema';
import { FetchProjectSlackChannelsDocument } from '~/view/pages/ProjectDetails/__generated__/schema';
import { ProjectSlackChannelResultType } from '~/view/pages/ProjectDetails/types';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';

interface Props {
  ctx: CellContext<ProjectSlackChannelResultType, unknown>;
}

export const RedirectOrCreateSlackChannelCell: FC<Props> = ({ ctx }) => {
  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const { template, channelUrl, channelId } = ctx.row.original;

  const [createProjectSlackChannel, { loading }] = useCreateProjectSlackChannelMutation();

  const handleRedirectOrCreateSlackChannelBtn = useCallback(() => {
    if (channelUrl) {
      window.open(channelUrl, '_blank');
    } else
      toast.promise(
        createProjectSlackChannel({
          variables: {
            input: { projectId, channelTemplate: { prefix: template?.prefix ?? '' } },
          },
          refetchQueries: [FetchProjectSlackChannelsDocument],
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
  }, [channelUrl, createProjectSlackChannel, projectId, template?.prefix]);

  return (
    <Button
      onClick={handleRedirectOrCreateSlackChannelBtn}
      variant={channelId ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
      label={channelId ? 'Slack' : 'Create'}
      className="w-[100px]"
      isLoading={loading}
    />
  );
};
