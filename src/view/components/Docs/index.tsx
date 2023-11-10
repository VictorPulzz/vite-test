import { EmptyState, Loader, SearchInput, useSelectOptions } from '@appello/web-ui';
import { Select } from '@appello/web-ui';
import { useListQueryParams } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PAGE_SIZE } from '~/constants/pagination';
import { ALL_SELECT_OPTION } from '~/constants/select';
import {
  DocumentFilter,
  DocumentSort,
  OrderDirectionChoice,
} from '~/services/gql/__generated__/globalTypes';
import {
  useFetchProjectGlossaryListQuery,
  useFetchUserGlossaryListQuery,
} from '~/services/gql/__generated__/schema';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { gqlTableFetchMore } from '~/utils/gqlTableFetchMore';
import { useUserPermissions } from '~/view/hooks/useUserPermissions';

import { useFetchAllDocumentCategoriesQuery } from '../../pages/ProjectDetails/__generated__/schema';
import {
  useFetchClientDocumentsQuery,
  useFetchInternalDocumentsQuery,
  useFetchProjectDocumentsQuery,
  useFetchUserDocumentsQuery,
} from './__generated__/schema';
import { DocsList } from './components/DocsList';
import { NewDocumentButton } from './components/NewDocumentButton';
import { DocsType } from './types';

interface Props {
  type: DocsType;
}

export const Docs: FC<Props> = ({ type }) => {
  const params = useParams();

  const projectId = params.id && type === DocsType.PROJECT ? Number(params.id) : undefined;
  const userId = params.id && type === DocsType.USER ? Number(params.id) : undefined;

  const { canWriteUserDocs } = useUserPermissions();

  const { searchValue, setSearchValue, offset } = useListQueryParams<DocumentFilter>();

  const [docsFilter, setDocsFilter] = useState<DocumentFilter>({
    addedById: undefined,
    userId: type === DocsType.USER ? userId : undefined,
    categoryId: undefined,
    projectId: projectId || undefined,
  });

  const [sortDirection, setSortDirection] = useState<OrderDirectionChoice>();

  const {
    data: projectDocuments,
    loading: isLoadingProjectDocuments,
    fetchMore: fetchMoreProjectDocuments,
  } = useFetchProjectDocumentsQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      filters: docsFilter,
      search: searchValue,
      sort: {
        direction: sortDirection ?? OrderDirectionChoice.DESC,
        field: DocumentSort.CREATED_AT,
      },
    },
    skip: type !== DocsType.PROJECT,
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: userDocuments,
    loading: isLoadingUserDocuments,
    fetchMore: fetchMoreUserDocuments,
  } = useFetchUserDocumentsQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      filters: docsFilter,
      search: searchValue,
      sort: {
        direction: sortDirection ?? OrderDirectionChoice.DESC,
        field: DocumentSort.CREATED_AT,
      },
    },
    skip: type !== DocsType.USER,
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: internalDocuments,
    loading: isLoadingInternalDocuments,
    fetchMore: fetchMoreInternalDocuments,
  } = useFetchInternalDocumentsQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      filters: docsFilter,
      search: searchValue,
      sort: {
        direction: sortDirection ?? OrderDirectionChoice.DESC,
        field: DocumentSort.CREATED_AT,
      },
    },
    skip: type !== DocsType.INTERNAL,
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: clientDocuments,
    loading: isLoadingClientDocuments,
    fetchMore: fetchMoreClientDocuments,
  } = useFetchClientDocumentsQuery({
    variables: {
      pagination: {
        limit: PAGE_SIZE,
        offset,
      },
      filters: docsFilter,
      search: searchValue,
      sort: {
        direction: sortDirection ?? OrderDirectionChoice.DESC,
        field: DocumentSort.CREATED_AT,
      },
    },
    skip: type !== DocsType.CLIENT,
    fetchPolicy: 'cache-and-network',
  });

  const { data: allDocumentCategories } = useFetchAllDocumentCategoriesQuery();

  const { data: allUsers } = useFetchUserGlossaryListQuery({
    skip: !!userId,
    fetchPolicy: 'cache-and-network',
  });

  const { data: allProjects } = useFetchProjectGlossaryListQuery({
    skip: !!projectId || !!userId,
    fetchPolicy: 'cache-and-network',
  });

  const projectsOptions = [
    ALL_SELECT_OPTION,
    ...useSelectOptions(allProjects?.projectGlossaryList.results, {
      value: 'id',
      label: 'name',
    }),
  ];

  const categoriesOptions = [
    ALL_SELECT_OPTION,
    ...useSelectOptions(allDocumentCategories?.documentCategoryList, {
      value: 'value',
      label: 'label',
    }),
  ];

  const usersOptions = [
    ALL_SELECT_OPTION,
    ...useSelectOptions(allUsers?.userGlossaryList.results, {
      value: 'id',
      label: 'fullName',
    }),
  ];

  const sortingOptions = enumToSelectOptions(OrderDirectionChoice);

  const docsData = useMemo(() => {
    switch (true) {
      case type === DocsType.INTERNAL:
        return {
          data: internalDocuments?.documentInternalList,
          loading: isLoadingInternalDocuments,
          fetchMore: fetchMoreInternalDocuments,
        };
      case type === DocsType.CLIENT:
        return {
          data: clientDocuments?.documentClientList,
          loading: isLoadingClientDocuments,
          fetchMore: fetchMoreClientDocuments,
        };
      case type === DocsType.PROJECT:
        return {
          data: projectDocuments?.projectDocumentList,
          loading: isLoadingProjectDocuments,
          fetchMore: fetchMoreProjectDocuments,
        };
      case type === DocsType.USER:
        return {
          data: userDocuments?.documentUserList,
          loading: isLoadingUserDocuments,
          fetchMore: fetchMoreUserDocuments,
        };

      default:
        return null;
    }
  }, [
    type,
    isLoadingProjectDocuments,
    fetchMoreProjectDocuments,
    isLoadingUserDocuments,
    fetchMoreUserDocuments,
    isLoadingInternalDocuments,
    fetchMoreInternalDocuments,
    isLoadingClientDocuments,
    fetchMoreClientDocuments,
    internalDocuments?.documentInternalList,
    clientDocuments?.documentClientList,
    projectDocuments?.projectDocumentList,
    userDocuments?.documentUserList,
  ]);

  return (
    <div className="flex flex-1 flex-col h-full">
      {(type === DocsType.PROJECT || type === DocsType.USER) && (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[2px]">
            <h2 className="text-p1 font-bold">Documents</h2>
            <p className="text-p5 text-gray-2">{docsData?.data?.count ?? 0} docs in total</p>
          </div>
          {type === DocsType.PROJECT && (
            <NewDocumentButton projectId={projectId} type={type} userId={userId} />
          )}
          {type === DocsType.USER && canWriteUserDocs && (
            <NewDocumentButton projectId={projectId} type={type} userId={userId} />
          )}
        </div>
      )}
      <div
        className={clsx(
          'grid items-end mt-3 gap-x-3',
          type === DocsType.USER ? 'grid-cols-1' : 'grid-cols-2',
        )}
      >
        <SearchInput
          className="flex-auto"
          defaultValue={searchValue}
          placeholder="Search documents"
          onChange={setSearchValue}
        />
        {type !== DocsType.USER && (
          <div
            className={clsx(
              'grid items-end gap-3',
              type === DocsType.INTERNAL || type === DocsType.PROJECT
                ? 'grid-cols-3'
                : 'grid-cols-4',
            )}
          >
            {type !== DocsType.PROJECT && type !== DocsType.INTERNAL && (
              <Select
                options={projectsOptions}
                placeholder="Project"
                value={docsFilter.projectId}
                onChange={value => setDocsFilter({ ...docsFilter, projectId: value })}
              />
            )}
            <Select
              options={categoriesOptions}
              placeholder="Category"
              value={docsFilter.categoryId}
              onChange={value => setDocsFilter({ ...docsFilter, categoryId: value })}
            />
            <Select
              options={usersOptions}
              placeholder="Added by"
              value={docsFilter.addedById}
              onChange={value => setDocsFilter({ ...docsFilter, addedById: value })}
            />
            <Select
              options={sortingOptions}
              placeholder="Sort"
              value={sortDirection}
              onChange={setSortDirection}
            />
          </div>
        )}
      </div>
      <div className="flex-auto">
        {docsData?.loading && (
          <div className="flex h-full items-center">
            <Loader colorful full />
          </div>
        )}
        {docsData && docsData.data?.results.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <EmptyState iconName="documents" label="No documents here yet" />
          </div>
        )}
        {!docsData?.loading && docsData?.data && docsData.data.results.length > 0 && (
          <DocsList
            data={docsData.data}
            type={type}
            onPageChange={gqlTableFetchMore(docsData.fetchMore)}
          />
        )}
      </div>
    </div>
  );
};
