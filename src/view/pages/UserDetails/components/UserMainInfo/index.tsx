import { getGqlError } from '@appello/common/lib/services/gql/utils/getGqlError';
import { Button, ButtonVariant } from '@appello/web-ui';
import { format } from 'date-fns';
import React, { FC, useCallback } from 'react';
import toast from 'react-hot-toast';

import { DateFormat } from '~/constants/dates';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { SectionContainer } from '~/view/components/SectionContainer';

import {
  FetchUserDetailsQuery,
  useConnectUserToBitbucketMutation,
} from '../../__generated__/schema';

interface Props {
  user: FetchUserDetailsQuery['userDetails'];
}

export const UserMainInfo: FC<Props> = ({ user }) => {
  const [connectUserToBitbucket, { loading }] = useConnectUserToBitbucketMutation();

  const handleConnectUserToBitbucket = useCallback(() => {
    toast.promise(
      connectUserToBitbucket({
        variables: {
          input: { id: user.id },
        },
      }),
      {
        loading: 'Connecting to Bitbucket...',
        success: 'Successfully connected to Bitbucket',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while connecting to Bitbucket: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [connectUserToBitbucket, user.id]);

  return (
    <SectionContainer containerClassName="w-[382px] min-w-[382px] h-fit">
      <div className="flex items-center gap-3 border-b-[1px] border-solid text-gray-6 pb-7">
        <Avatar uri={user.photoThumbnail?.url || photoPlaceholder} size={50} />
        <div className="flex flex-col gap-2">
          <h2 className="text-p1 text-primary font-bold leading-none">{user.fullName}</h2>
          <span className="text-p4 text-gray-2">{user.email}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-7">
        <Button
          variant={ButtonVariant.SECONDARY}
          label="Connect to Bitbucket"
          withIcon="connection"
          onClick={handleConnectUserToBitbucket}
          isLoading={loading}
        />
        {user.department && (
          <div className="flex flex-col gap-[2px]">
            <span className="text-p5 text-gray-2">Department</span>
            <span className="text-p3 text-primary leading-none">{user.department.name}</span>
          </div>
        )}
        {user.role && (
          <div className="flex flex-col gap-[2px]">
            <span className="text-p5 text-gray-2">Role</span>
            <span className="text-p3 text-primary leading-none">{user.role.name}</span>
          </div>
        )}
        <div className="flex flex-col gap-[2px]">
          <span className="text-p5 text-gray-2">Status</span>
          <span className={`text-p3 leading-none ${user.isActive ? 'text-green' : 'text-primary'}`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        {user.contractType && (
          <div className="flex flex-col gap-[2px]">
            <span className="text-p5 text-gray-2">Contract type</span>
            <span className="text-p3 text-primary leading-none">
              {convertUppercaseToReadable(user.contractType)}
            </span>
          </div>
        )}
        {user.birthDate && (
          <div className="flex flex-col gap-[2px]">
            <span className="text-p5 text-gray-2">Date of Birth</span>
            <span className="text-p3 text-primary leading-none">
              {format(new Date(user.birthDate), DateFormat.DMY)}
            </span>
          </div>
        )}
        {user.address && (
          <div className="flex flex-col gap-[2px]">
            <span className="text-p5 text-gray-2">Address</span>
            <span className="text-p3 text-primary  break-words leading-4">{user.address}</span>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};
