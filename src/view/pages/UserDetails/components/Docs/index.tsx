import { format } from 'date-fns';
import React, { FC } from 'react';

import { DateFormat } from '~/constants/dates';
import { DocumentFilter } from '~/services/gql/__generated__/globalTypes';
import { getFileExtension } from '~/utils/getFileExtension';
import { Pagination } from '~/view/components/Pagination';
import { useFetchDocumentsQuery } from '~/view/pages/ProjectDetails/__generated__/schema';
import { DocumentMenu } from '~/view/pages/ProjectDetails/components/Docs/components/DocumentMenu';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Loader } from '~/view/ui/components/common/Loader';
import { SearchInput } from '~/view/ui/components/common/SearchInput';
import { useListQueryParams } from '~/view/ui/hooks/useListQueryParams';

interface Props {
  userId: number;
}

const USER_DOCS_PAGE_SIZE = 10;

export const Docs: FC<Props> = ({ userId }) => {
  const { searchValue, setSearchValue, offset, setOffset } = useListQueryParams<DocumentFilter>();

  const { data, loading, fetchMore } = useFetchDocumentsQuery({
    variables: {
      pagination: {
        limit: USER_DOCS_PAGE_SIZE,
        offset,
      },
      filters: {
        addedById: userId,
      },
      search: searchValue,
    },
    fetchPolicy: 'cache-and-network',
  });

  const hasPagination = data && data.documentList.count > USER_DOCS_PAGE_SIZE;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[2px]">
          <h2 className="text-p1 font-bold">Documents</h2>
        </div>

        <Button
          variant={ButtonVariant.PRIMARY}
          label="Upload new"
          withIcon="add"
          className="w-36"
          onClick={() => null}
        />
      </div>
      <SearchInput
        onChange={setSearchValue}
        defaultValue={searchValue}
        placeholder="Search documents"
        className="flex-auto mt-5"
      />
      {loading && (
        <div className="mt-6">
          <Loader full colorful />
        </div>
      )}
      {data && data.documentList.results.length === 0 && (
        <div className="flex h-[60vh]">
          <EmptyState iconName="documents" label="No documents here yet" />
        </div>
      )}
      {!loading && data && data.documentList.results.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {data.documentList.results.map(({ id, file, createdAt, project }) => (
              <div
                key={id}
                className="flex justify-between gap-3 font-medium p-4 border border-solid border-gray-5 rounded-md"
              >
                <div className="flex gap-3 items-center">
                  <div className="bg-blue/10 p-3 text-blue text-c1 rounded-md w-10 h-10 flex items-center justify-center">
                    {getFileExtension(file.fileName)}
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <span className="text-p3 text-black leading-3">{file.fileName}</span>
                    <span className="text-c1 text-gray-2 leading-4">
                      {format(new Date(String(createdAt)), DateFormat.PP)} • {project?.name}
                    </span>
                  </div>
                </div>
                <DocumentMenu file={file} documentId={id} />
              </div>
            ))}
          </div>
          {hasPagination && (
            <Pagination
              setOffset={setOffset}
              totalCount={data.documentList.count}
              offset={offset}
              dataLength={data.documentList.results.length}
              fetchMore={fetchMore}
              pageSize={USER_DOCS_PAGE_SIZE}
            />
          )}
        </>
      )}
    </div>
  );
};
