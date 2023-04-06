import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { CellContext } from '@tanstack/react-table';
import React, { FC, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { ProjectSlackType } from '~/services/gql/__generated__/globalTypes';
import { useCreateProjectSlackChannelMutation } from '~/view/pages/ProjectDetails/__generated__/schema';
import { FetchProjectSlackChannelsDocument } from '~/view/pages/ProjectDetails/__generated__/schema';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';

interface Props {
  ctx: CellContext<ProjectSlackType, unknown>;
}

export const RedirectOrCreateSlackChannelCell: FC<Props> = ({ ctx }) => {
  const params = useParams();
  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const { type, channelUrl, channelId } = ctx.row.original;

  const [createProjectSlackChannel, { loading }] = useCreateProjectSlackChannelMutation();

  const handleRedirectOrCreateSlackChannelBtn = useCallback(() => {
    if (channelUrl) {
      window.open(channelUrl, '_blank');
    } else
      toast.promise(
        createProjectSlackChannel({
          variables: {
            input: { projectId, channelType: { name: type?.name ?? '' } },
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
  }, [channelUrl, createProjectSlackChannel, projectId, type?.name]);

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
