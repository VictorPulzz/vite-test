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

export const UserMainInfo: FC<Props> = ({
  user: {
    id,
    photo,
    fullName,
    email,
    department,
    role,
    isActive,
    contractType,
    birthDate,
    address,
  },
}) => {
  const [connectUserToBitbucket, { loading }] = useConnectUserToBitbucketMutation();

  const handleConnectUserToBitbucket = useCallback(() => {
    toast.promise(
      connectUserToBitbucket({
        variables: {
          input: { id: Number(id) },
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
  }, [connectUserToBitbucket, id]);

  return (
    <SectionContainer containerClassName="w-[382px] min-w-[382px] h-fit">
      <div className="flex items-center gap-3 border-b-[1px] border-solid text-gray-6 pb-7">
        <Avatar uri={photo?.url || photoPlaceholder} size={50} />
        <div className="flex flex-col gap-2">
          <h2 className="text-p1 text-primary font-bold leading-none">{fullName}</h2>
          <span className="text-p4 text-gray-2">{email}</span>
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
        {department && (
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Department</span>
            <span className="text-p3 text-primary leading-none">{department.name}</span>
          </div>
        )}
        {role && (
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Role</span>
            <span className="text-p3 text-primary leading-none">{role.name}</span>
          </div>
        )}
        <div className="flex flex-col gap-[2px]">
          <span className="text-c1 text-gray-2">Status</span>
          <span className={`text-p3 leading-none ${isActive ? 'text-green' : 'text-primary'}`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        {contractType && (
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Contract type</span>
            <span className="text-p3 text-primary leading-none">
              {convertUppercaseToReadable(contractType)}
            </span>
          </div>
        )}
        {birthDate && (
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Date of Birth</span>
            <span className="text-p3 text-primary leading-none">
              {format(new Date(birthDate), DateFormat.DMY)}
            </span>
          </div>
        )}
        {address && (
          <div className="flex flex-col gap-[2px]">
            <span className="text-c1 text-gray-2">Address</span>
            <span className="text-p3 text-primary  break-words leading-4">{address}</span>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};
