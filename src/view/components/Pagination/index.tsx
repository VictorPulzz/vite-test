import { ApolloQueryResult } from '@apollo/client/core/types';
import { FetchMoreQueryOptions } from '@apollo/client/core/watchQueryOptions';
import clsx from 'clsx';
import React, { FC, useCallback, useState } from 'react';
import Paginate from 'react-paginate';

import { PAGE_SIZE } from '~/constants/pagination';
import { Icon } from '~/view/ui/components/common/Icon';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  setOffset: (offset: number) => void;
  totalCount: number;
  offset: number;
  dataLength: number;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  fetchMore: (
    options: FetchMoreQueryOptions<any> & {
      updateQuery?: (
        previousQueryResult: any,
        options: {
          fetchMoreResult: any;
          variables: any;
        },
      ) => any;
    },
  ) => Promise<ApolloQueryResult<void>>;
}

export const Pagination: FC<Props> = ({
  className,
  setOffset,
  totalCount,
  offset,
  dataLength,
  fetchMore,
}) => {
  const [isFetching, setFetching] = useState<boolean>(false);

  const handlePageClick = useCallback(
    async (event: { selected: number }) => {
      const newOffset = (event.selected * PAGE_SIZE) % totalCount;
      setOffset(newOffset);

      try {
        setFetching(true);
        await fetchMore({
          variables: {
            pagination: {
              limit: PAGE_SIZE,
              offset: newOffset,
            },
          },
          updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
        });
      } finally {
        setFetching(false);
      }
    },
    [fetchMore, setOffset, totalCount],
  );

  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className={className}>
      <Paginate
        breakLabel="..."
        nextLabel={<Icon name="down-arrow" size={18} className="inline -rotate-90" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        breakLinkClassName={styles['pagination__link']}
        breakClassName={styles['pagination__item']}
        pageCount={pageCount}
        forcePage={offset / PAGE_SIZE}
        previousLabel={<Icon name="down-arrow" size={18} className="inline rotate-90" />}
        containerClassName={clsx(styles['pagination'], 'mt-4')}
        marginPagesDisplayed={5}
        pageLinkClassName={styles['pagination__link']}
        pageClassName={styles['pagination__item']}
        disabledClassName={styles['pagination__item--disabled']}
        activeClassName={styles['pagination__item--active']}
        previousLinkClassName={clsx(styles['pagination__link'], styles['pagination__link--nav'])}
        previousClassName={styles['pagination__item']}
        nextLinkClassName={clsx(styles['pagination__link'], styles['pagination__link--nav'])}
        nextClassName={styles['pagination__item']}
      />
      <p className="mt-3 text-c2 text-gray-2">
        Results: {offset + 1} - {!isFetching ? offset + dataLength : '...'} of {totalCount}
      </p>
    </div>
  );
};
