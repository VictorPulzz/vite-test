import { EmptyState, Loader } from '@appello/web-ui';
import React, { FC, useEffect, useRef, useState } from 'react';

import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';

import { INVITE_USERS_TO_SLACK_PAGE_SIZE } from '../../consts';
import { UsersListItem } from './components/UsersListItem';

interface Props {
  slackChannelId: number;
  searchValue: string;
  offset: number;
}

export const UsersList: FC<Props> = ({ slackChannelId, searchValue, offset }) => {
  const usersListRef = useRef<HTMLDivElement>(null);

  const [invitedUsersIds, setInvitedUsersIds] = useState<number[]>([]);
  const [nextOffset, setNextOffset] = useState<number>(0);
  const [isFetching, setFetching] = useState<boolean>(false);

  const {
    data: allUsers,

    loading: isLoadingAllUsers,
    fetchMore,
  } = useFetchUserGlossaryListQuery({
    variables: {
      pagination: {
        limit: INVITE_USERS_TO_SLACK_PAGE_SIZE,
        offset,
      },
      search: searchValue,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (allUsers) {
      setNextOffset(allUsers.userGlossaryList.results.length);
    }
  }, [allUsers]);

  useEffect(() => {
    if (!usersListRef.current) {
      return () => {};
    }

    const handleScroll = async (e: Event): Promise<void> => {
      const element = e.target as HTMLElement;
      const isBottomReached =
        element.scrollHeight - Math.ceil(element.scrollTop) === element.clientHeight;
      if (isBottomReached) {
        try {
          setFetching(true);
          await fetchMore({
            variables: {
              pagination: {
                limit: INVITE_USERS_TO_SLACK_PAGE_SIZE,
                offset: nextOffset,
              },
              search: searchValue,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => ({
              userGlossaryList: {
                count: fetchMoreResult.userGlossaryList.count,
                results: [
                  ...previousResult.userGlossaryList.results,
                  ...fetchMoreResult.userGlossaryList.results,
                ],
              },
            }),
          });
        } finally {
          setFetching(false);
        }
      }
    };

    usersListRef.current.addEventListener('scroll', handleScroll);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      usersListRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [fetchMore, nextOffset, searchValue]);

  return (
    <div className="mt-3 h-[360px] overflow-auto" ref={usersListRef}>
      {isLoadingAllUsers && (
        <div className="flex items-center h-[320px]">
          <Loader full colorful />
        </div>
      )}
      {allUsers && allUsers.userGlossaryList.results.length === 0 && (
        <div className="flex h-full">
          <EmptyState iconName="users" label="Not found" />
        </div>
      )}
      {!isLoadingAllUsers &&
        allUsers &&
        allUsers.userGlossaryList.results.length > 0 &&
        allUsers.userGlossaryList.results.map(user => (
          <UsersListItem
            key={user.id}
            user={user}
            slackChannelId={slackChannelId}
            invitedUsersIds={invitedUsersIds}
            setInvitedUsersIds={setInvitedUsersIds}
          />
        ))}
      <div className="absolute left-[230px] bottom-[5px] h-[30px] flex items-center justify-center">
        {isFetching && nextOffset !== allUsers?.userGlossaryList.count && (
          <Loader full colorful dotSize={8} />
        )}
      </div>
    </div>
  );
};
