// import { useSwitchValue } from '@appello/common/lib/hooks';
import { Button, ButtonVariant } from '@ui/components/common/Button';
import { EmptyState } from '@ui/components/common/EmptyState';
import { Table } from '@ui/components/common/Table';
import { TableLoader } from '@ui/components/common/TableLoader';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ROUTES } from '~/constants/routes';
// import { PAGE_SIZE } from '~/constants/pagination';
// import { Sorting } from '~/types';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
// import { ClientFilter, ClientOrder } from '~/services/gql/__generated__/globalTypes';
// import { isNil } from '~/utils/isNil';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { SearchInput } from '~/view/ui/components/common/SearchInput';
import { SelectField } from '~/view/ui/components/form/SelectField';

// import { FetchRepositories } from './__generated__/schema';
import { REPOSITORIES_TABLE_COLUMNS } from './consts';

// import { useFetchRepositoriesQuery } from './__generated__/schema';
// import { ClientsFilterModal } from './components/ClientsFilterModal';
// import { CLIENTS_TABLE_COLUMNS } from './consts';

// TODO remove repositoriesTestData when backend will be ready
export enum ProjectPlatfrom {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
}

// TODO remove repositoriesTestData when backend will be ready
const repositoriesTestData = [
  {
    projectId: 2,
    repositoryId: 1,
    repositoryName: 'Pic-up-web-frontend',
    projectName: 'PicUp',
    gitUrl: 'https://bitbucket.org/appello/pic-up-web-frontend',
    createdAt: '28/10/2022',
    platform: 'Web',
  },
  {
    projectId: 4,
    repositoryId: 2,
    repositoryName: 'Pic-up-customer-mobile',
    projectName: 'PicUp',
    gitUrl: 'https://bitbucket.org/appello/pic-up-customer-mobile',
    createdAt: '29/10/2022',
    platform: 'Mobile',
  },
];

export const RepositoriesPage: FC = () => {
  const { control } = useForm();
  // const [searchValue, setSearchValue] = useState('');
  // TODO remove any
  // const [sorting, setSorting] = useState<Sorting<any>>([]);
  // const [filter, setFilter] = useState<Nullable<ClientFilter>>(null);

  // const filtersCount = useMemo(() => {
  //   return Object.values(filter || {}).filter(value => !isNil(value)).length;
  // }, [filter]);

  // const {
  //   value: isFilterModalOpen,
  //   on: openFilterModal,
  //   off: closeFilterModal,
  // } = useSwitchValue(false);

  // const { data, loading, fetchMore } = useFetchRepositoriesQuery();

  const repositoriesFilterOptions = enumToSelectOptions(ProjectPlatfrom);

  // TODO remove test data later
  const data = {
    loading: false,
    repositoriesList: repositoriesTestData,
  };

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Repositories</h1>
          <p className="text-c1 text-gray-2">
            {(data && data.repositoriesList.length) ?? 0} repositories in total
          </p>
        </div>
        <Button
          label="Add repository"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          to={ROUTES.ADD_REPOSITORY}
        />
      </div>
      <div className="mt-5 flex gap-3">
        <SearchInput
          // onChange={setSearchValue}
          onChange={() => null}
          placeholder="Search repository"
          className="flex-1"
        />
        <SelectField
          className="w-40"
          name="group"
          options={repositoriesFilterOptions}
          control={control}
          // placeholder="Select status..."
        />
      </div>
      {data.loading && <TableLoader className="mt-10" />}
      {data && data.repositoriesList.length === 0 && (
        <EmptyState iconName="repositories" label="No repositories here yet" />
      )}
      {!data.loading && data && data.repositoriesList.length > 0 && (
        <Table
          className="mt-6"
          data={data.repositoriesList}
          columns={REPOSITORIES_TABLE_COLUMNS}
          // sorting={sorting}
          // setSorting={setSorting}
          // fetchMore={fetchMore}
          totalCount={data.repositoriesList.length}
        />
      )}
    </SidebarLayout>
  );
};
