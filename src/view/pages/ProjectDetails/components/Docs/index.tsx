import { format } from 'date-fns';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { PAGE_SIZE } from '~/constants/pagination';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { ALL_SELECT_OPTION } from '~/constants/select';
import {
  DocumentFilter,
  DocumentSort,
  OrderDirectionChoice,
} from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { getFileExtension } from '~/utils/getFileExtension';
import { Pagination } from '~/view/components/Pagination';
import { useHasAccess } from '~/view/hooks/useHasAccess';
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
import { NewDocumentButton } from './components/NewDocumentButton';

interface DocsProps {
  isProjectDetailsPage?: boolean;
  isInternal?: boolean;
  projectId?: number;
  userId?: number;
  setDocsCount?(count: number): void;
  setIsInternal?(isInternal: boolean): void;
}

export const Docs: FC<DocsProps> = ({
  isProjectDetailsPage,
  isInternal,
  projectId,
  userId,
  setDocsCount,
  setIsInternal,
}) => {
  const canAddProjectDocs = useHasAccess(Permission.ADD_PROJECT_DOCS);
  const canAddUserDocs = useHasAccess(Permission.ADD_USER_DOCS);

  const location = useLocation();

  const { searchValue, setSearchValue, offset, setOffset } = useListQueryParams<DocumentFilter>();

  const isUserDetailsPage = !!matchPath(ROUTES.USER_DETAILS, location?.pathname);

  const [docsFilter, setDocsFilter] = useState<DocumentFilter>({
    addedById: (!isUserDetailsPage && userId) || undefined,
    userId: (isUserDetailsPage && userId) || undefined,
    categoryId: undefined,
    projectId: projectId || undefined,
  });

  const [sortDirection, setSortDirection] = useState<OrderDirectionChoice>();

  const { data: allProjects } = useFetchAllProjectsQuery({
    variables: {
      pagination: { limit: 0 },
    },
    fetchPolicy: 'cache-and-network',
    skip: !!projectId,
  });

  const { data: allDocumentCategories } = useFetchAllDocumentCategoriesQuery();

  const { data: allUsers } = useFetchAllUsersQuery({
    variables: {
      pagination: { limit: 0 },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data, loading, fetchMore } = useFetchDocumentsQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      filters: { ...docsFilter, internal: isInternal },
      search: searchValue,
      sort: {
        direction: sortDirection ?? OrderDirectionChoice.DESC,
        field: DocumentSort.CREATED_AT,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    setOffset(0);
  }, [isInternal, setOffset]);

  useEffect(() => {
    if (data && setDocsCount) {
      setDocsCount(data.documentList.count);
    }
  }, [data, setDocsCount]);

  useEffect(() => {
    if (setIsInternal) {
      setIsInternal(!!isInternal);
    }
  }, [isInternal, setIsInternal]);

  const projectsOptions = useMemo(
    () => (allProjects && [ALL_SELECT_OPTION, ...allProjects.projectsList.results]) ?? [],
    [allProjects],
  );

  const categoriesOptions = useMemo(
    () =>
      (allDocumentCategories && [
        ALL_SELECT_OPTION,
        ...allDocumentCategories.documentCategoryList,
      ]) ??
      [],
    [allDocumentCategories],
  );

  const usersOptions = useMemo(
    () =>
      (allUsers && [
        ALL_SELECT_OPTION,
        ...allUsers.usersList.results.map(({ id, fullName }) => ({
          value: Number(id),
          label: fullName ?? '',
        })),
      ]) ??
      [],
    [allUsers],
  );

  const sortingOptions = enumToSelectOptions(OrderDirectionChoice);

  const hasPagination = data && data.documentList.count > PAGE_SIZE;

  const getDocsSectionHeader = useCallback(
    (isVisibleNewDocBtn: boolean) => {
      return (
        <>
          <div className="flex flex-col gap-[2px]">
            <h2 className="text-p1 font-bold">Documents</h2>
            <p className="text-c1 text-gray-2">
              {(data && data.documentList.count) ?? 0} docs in total
            </p>
          </div>
          {isVisibleNewDocBtn && <NewDocumentButton projectId={projectId} userId={userId} />}
        </>
      );
    },
    [data, projectId, userId],
  );

  return (
    <>
      <div className={`flex items-center ${isInternal ? 'justify-end' : 'justify-between'}`}>
        {isProjectDetailsPage && getDocsSectionHeader(canAddProjectDocs)}
        {userId && getDocsSectionHeader(canAddUserDocs)}
      </div>
      <div className={`grid ${userId ? 'grid-cols-1' : 'grid-cols-2'} items-end mt-3 gap-x-3`}>
        <SearchInput
          onChange={setSearchValue}
          defaultValue={searchValue}
          placeholder="Search documents"
          className="flex-auto"
        />
        {!userId && (
          <div
            className={`grid ${
              isInternal || projectId ? 'grid-cols-3' : 'grid-cols-4'
            } items-end gap-3`}
          >
            {!projectId && !isInternal && (
              <Select
                options={projectsOptions}
                value={docsFilter.projectId}
                onChange={value => setDocsFilter({ ...docsFilter, projectId: value })}
                placeholder="Project"
              />
            )}
            <Select
              options={categoriesOptions}
              value={docsFilter.categoryId}
              onChange={value => setDocsFilter({ ...docsFilter, categoryId: value })}
              placeholder="Category"
            />
            <Select
              options={usersOptions}
              value={docsFilter.addedById}
              onChange={value => setDocsFilter({ ...docsFilter, addedById: value })}
              placeholder="Added by"
            />
            <Select
              options={sortingOptions}
              value={sortDirection}
              placeholder="Sort"
              onChange={setSortDirection}
            />
          </div>
        )}
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
        <div className={`grid ${userId ? 'grid-cols-2' : 'grid-cols-3'} gap-4 mt-6`}>
          {data.documentList.results.map(({ id, file, createdAt, addedBy, project }) => (
            <div
              key={id}
              className="flex justify-between gap-3 font-medium p-4 border border-solid border-gray-5 rounded-md"
            >
              <div className="flex gap-3 items-center min-w-0">
                <div className="bg-blue/10 p-3 text-blue text-c1 rounded-md w-10 h-10 flex items-center justify-center">
                  {getFileExtension(file.fileName)}
                </div>
                <div className="flex flex-col gap-[5px] truncate">
                  <span className="text-p3 text-black leading-4 truncate">
                    {file.fileName.split('.').slice(0, -1).join('.')}
                  </span>
                  <span className="text-c1 text-gray-2 leading-4 truncate">
                    {format(new Date(String(createdAt)), DateFormat.D_MMM_Y)} • {addedBy?.fullName}{' '}
                    {!isInternal &&
                      !isProjectDetailsPage &&
                      !isUserDetailsPage &&
                      `• ${project?.name}`}
                  </span>
                </div>
              </div>
              <DocumentMenu file={file} documentId={id} />
            </div>
          ))}
        </div>
      )}
      {hasPagination && (
        <Pagination
          setOffset={setOffset}
          totalCount={data.documentList.count}
          offset={offset}
          dataLength={data.documentList.results.length}
          fetchMore={fetchMore}
        />
      )}
    </>
  );
};
