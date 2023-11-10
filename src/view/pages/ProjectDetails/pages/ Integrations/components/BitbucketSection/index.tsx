import { getGqlError } from '@appello/common/lib/services/gql/utils';
import { Button, ButtonVariant, Icon } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import bitbucket from '~/view/assets/images/bitbucket.svg';
import { SectionContainer } from '~/view/components/SectionContainer';
import {
  FetchProjectIntegrationsDocument,
  useConnectProjectToGitMutation,
} from '~/view/pages/ProjectDetails/__generated__/schema';

interface Props {
  gitGroupId: string;
  projectId: number;
}

export const BitbucketSection: FC<Props> = ({ gitGroupId, projectId }) => {
  const [connectToGit, { loading }] = useConnectProjectToGitMutation();

  const connectProjectToGit = useCallback(
    (id: number) => {
      toast.promise(
        connectToGit({
          variables: {
            input: { id },
          },
          refetchQueries: [FetchProjectIntegrationsDocument],
        }),
        {
          loading: 'Сonnecting project to bitbucket...',
          success: 'Project succesfully connected to bitbucket',
          error: e => {
            const errors = getGqlError(e?.graphQLErrors);
            return `Error while connecting project to bitbucket: ${JSON.stringify(errors)}`;
          },
        },
      );
    },
    [connectToGit],
  );

  return (
    <SectionContainer containerClassName="h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            alt="bitbucket"
            className="w-[46px] h-[46px] bg-blue/10 p-3 rounded-full"
            src={bitbucket}
          />
          <div className="flex flex-col">
            <span className="text-p1 font-bold">Bitbucket</span>
            <span className={clsx('text-p6 text-gray-1', gitGroupId && 'text-green')}>
              {gitGroupId ? 'Connected' : 'Not connected'}
            </span>
          </div>
        </div>
        {gitGroupId ? (
          <Icon className="text-green" name="check" size={24} />
        ) : (
          <Button
            className="w-[140px]"
            isLoading={loading}
            label="Connect"
            variant={ButtonVariant.PRIMARY}
            withIcon="cloudConnection"
            onClick={() => connectProjectToGit(projectId)}
          />
        )}
      </div>
    </SectionContainer>
  );
};
