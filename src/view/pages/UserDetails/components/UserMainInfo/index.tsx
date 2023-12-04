import { getGqlError } from '@appello/services/dist/gql';
import { Badge, BadgeColor, Button, ButtonVariant } from '@appello/web-ui';
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
  useResendInviteMutation,
} from '../../__generated__/schema';

interface Props {
  user: FetchUserDetailsQuery['userDetails'];
}

export const UserMainInfo: FC<Props> = ({ user }) => {
  const [connectUserToBitbucket, { loading: isLoadingConnectUserToBitbucket }] =
    useConnectUserToBitbucketMutation();

  const [resendInvite, { loading: isLoadingResendInvite }] = useResendInviteMutation();

  const handleResendInvite = useCallback(() => {
    toast.promise(
      resendInvite({
        variables: {
          input: { userId: user.id },
        },
      }),
      {
        loading: 'Resending invite...',
        success: 'Successfully resent invite',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `${errors?.explain?.non_field}`;
        },
      },
    );
  }, [resendInvite, user.id]);

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
          return `${errors?.explain?.non_field}`;
        },
      },
    );
  }, [connectUserToBitbucket, user.id]);

  return (
    <div className="flex flex-col gap-3 w-[382px] min-w-[382px]">
      <SectionContainer containerClassName="flex items-center gap-3 border-b-[1px] border-solid text-gray-6 pb-7">
        <Avatar size={50} uri={user.photoThumbnail?.url || photoPlaceholder} />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-p1 text-primary font-bold leading-none break-all">
              {user.fullName}
            </h2>
            {!user.inviteAccepted && (
              <div className="whitespace-nowrap">
                <Badge filled color={BadgeColor.GRAY}>
                  Not in SB2
                </Badge>
              </div>
            )}
          </div>
          <span className="text-p4 text-gray-2">{user.email}</span>
        </div>
      </SectionContainer>
      <SectionContainer>
        <h2 className="text-p3 font-medium">Actions</h2>
        <div className="flex items-center gap-3 mt-3">
          {!user.inviteAccepted && (
            <Button
              isLoading={isLoadingResendInvite}
              label="Resend invite"
              variant={ButtonVariant.SECONDARY}
              onClick={handleResendInvite}
            />
          )}
          <Button
            isLoading={isLoadingConnectUserToBitbucket}
            label="Connect to Bitbucket"
            variant={ButtonVariant.SECONDARY}
            onClick={handleConnectUserToBitbucket}
          />
        </div>
      </SectionContainer>
      <SectionContainer containerClassName="flex flex-col gap-4 pt-7">
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
      </SectionContainer>
    </div>
  );
};
