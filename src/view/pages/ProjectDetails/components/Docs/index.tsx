import { format } from 'date-fns';
import React, { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { PAGE_SIZE } from '~/constants/pagination';
import { ALL_SELECT_OPTION } from '~/constants/select';
import {
  DocumentFilter,
  DocumentSort,
  OrderDirectionChoice,
} from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { getFileExtension } from '~/utils/getFileExtension';
import { Pagination } from '~/view/components/Pagination';
import { SectionContainer } from '~/view/components/SectionContainer';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { Loader } from '~/view/ui/components/common/Loader';
import { SearchInput } from '~/view/ui/components/common/SearchInput';
import { Select } from '~/view/ui/components/form/Select';
import { useListQueryParams } from '~/view/ui/hooks/useListQueryParams';

import {
  useFetchAllDocumentCategoriesQuery,
  useFetchAllProjectsQuery,
  useFetchAllUsersQuery,
  useFetchDocumentsQuery,
} from '../../__generated__/schema';
import { DocumentMenu } from './components/DocumentMenu';

interface DocsProps {
  withHeading?: boolean;
}

export const Docs: FC<DocsProps> = ({ withHeading }) => {
  const params = useParams();

  const projectId = params.id ? Number(params.id) : 0;

  const { searchValue, setSearchValue, offset, setOffset } = useListQueryParams<DocumentFilter>();

  const [project, setProject] = useState<Nullable<number>>();
  const [category, setCategory] = useState<Nullable<number>>();
  const [addedBy, setAddedBy] = useState<Nullable<number>>();
  const [sortDirecion, setSortDirecion] = useState<OrderDirectionChoice>(OrderDirectionChoice.DESC);

  const { data: allProjects } = useFetchAllProjectsQuery({
    variables: {
      pagination: {},
    },
    fetchPolicy: 'cache-and-network',
    skip: !!projectId,
  });

  const { data: allDocumentCategories } = useFetchAllDocumentCategoriesQuery();

  const { data: allUsers } = useFetchAllUsersQuery({
    variables: {
      pagination: {},
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data, loading, fetchMore } = useFetchDocumentsQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      filters: {
        addedById: addedBy,
        categoryId: category,
        projectId: project,
      },
      search: searchValue,
      sort: {
        direction: sortDirecion,
        field: DocumentSort.CREATED_AT,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const projectsOptions = useMemo(
    () =>
      allProjects?.projectsList.results
        ? [ALL_SELECT_OPTION, ...allProjects.projectsList.results]
        : [],
    [allProjects?.projectsList.results],
  );

  const categoriesOptions = useMemo(
    () =>
      allDocumentCategories?.documentCategoryList
        ? [ALL_SELECT_OPTION, ...allDocumentCategories.documentCategoryList]
        : [],
    [allDocumentCategories?.documentCategoryList],
  );

  const usersOptions = useMemo(
    () =>
      allUsers?.usersList?.results
        ? [
            ALL_SELECT_OPTION,
            ...allUsers.usersList.results.map(({ id, fullName }) => ({
              value: Number(id),
              label: fullName ?? '',
            })),
          ]
        : [],
    [allUsers?.usersList.results],
  );

  const sortingOptions = enumToSelectOptions(OrderDirectionChoice);

  return (
    <SectionContainer containerClassName="min-h-[calc(100vh-12rem)] relative">
      {withHeading && (
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
      )}
      <div className="grid grid-cols-2 items-end mt-3 gap-x-3">
        <SearchInput
          onChange={setSearchValue}
          defaultValue={searchValue}
          placeholder="Search documents"
          className="flex-auto"
        />
        <div className="flex items-end gap-3">
          {!projectId && (
            <Select
              options={projectsOptions}
              value={project}
              onChange={setProject}
              placeholder="Project"
            />
          )}
          <Select
            options={categoriesOptions}
            value={category}
            onChange={setCategory}
            placeholder="Category"
          />
          <Select
            options={usersOptions}
            value={addedBy}
            onChange={setAddedBy}
            placeholder="Added by"
          />
          <Select
            options={sortingOptions}
            value={sortDirecion}
            placeholder="Sort"
            onChange={setSortDirecion}
          />
        </div>
      </div>
      {loading && (
        <div className="flex h-[60vh]">
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
          <div className="grid grid-cols-4 gap-4 mt-6">
            {data.documentList.results.map((document, index) => (
              <div
                key={index}
                className="flex justify-between gap-3 font-medium p-4 border border-solid border-gray-5 rounded-md"
              >
                <div className="flex gap-3">
                  <div className="bg-blue/10 p-3 text-blue text-c1 rounded-md">
                    {getFileExtension(document.file.fileName)}
                  </div>
                  <div className="flex flex-col gap-[3px]">
                    <span className="text-p3 text-black">{document.file.fileName}</span>
                    <span className="text-c1 text-gray-2 leading-none">
                      {format(new Date(String(document.createdAt)), DateFormat.PP)} •{' '}
                      {document.addedBy?.fullName}
                    </span>
                  </div>
                </div>
                <DocumentMenu file={document.file} />
              </div>
            ))}
          </div>
          <Pagination
            className="absolute bottom-10"
            setOffset={setOffset}
            totalCount={data.documentList.count}
            offset={offset}
            dataLength={data.documentList.results.length}
            fetchMore={fetchMore}
          />
        </>
      )}
    </SectionContainer>
  );
};
