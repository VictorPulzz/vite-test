import { Button, ButtonVariant } from '@ui/components/common/Button';
import { EmptyState } from '@ui/components/common/EmptyState';
import { Table } from '@ui/components/common/Table';
import { TableLoader } from '@ui/components/common/TableLoader';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ROUTES } from '~/constants/routes';
import { StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { SearchInput } from '~/view/ui/components/common/SearchInput';
import { SelectField } from '~/view/ui/components/form/SelectField';

import { useFetchProjectsQuery } from './__generated__/schema';
import { PROJECTS_TABLE_COLUMNS } from './consts';

const statusOptions = enumToSelectOptions(StatusEnum);

export const ProjectsPage: FC = () => {
  const { control } = useForm();
  // const [searchValue, setSearchValue] = useState('');
  // TODO remove any
  // const [filter, setFilter] = useState<Nullable<ClientFilter>>(null);

  // const filtersCount = useMemo(() => {
  //   return Object.values(filter || {}).filter(value => !isNil(value)).length;
  // }, [filter]);

  // const {
  //   value: isFilterModalOpen,
  //   on: openFilterModal,
  //   off: closeFilterModal,
  // } = useSwitchValue(false);

  const { data, loading, fetchMore } = useFetchProjectsQuery({ fetchPolicy: 'cache-and-network' });

  return (
    <SidebarLayout contentClassName="p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-h4">Projects</h1>
          <p className="text-c1 text-gray-2">
            {(data && data.projectsList.length) ?? 0} projects in total
          </p>
        </div>
        <Button
          label="New project"
          withIcon="plus"
          variant={ButtonVariant.PRIMARY}
          className="w-40"
          to={ROUTES.ADD_PROJECT}
        />
      </div>
      <div className="mt-5 flex gap-3">
        <SearchInput
          // onChange={setSearchValue}
          onChange={() => null}
          placeholder="Search projects"
          className="flex-1"
        />
        <SelectField
          className="w-40"
          name="group"
          options={statusOptions}
          control={control}
          // placeholder="Select status..."
        />
      </div>
      {loading && <TableLoader className="mt-10" />}
      {data && data.projectsList.length === 0 && (
        <EmptyState iconName="projects" label="No projects here yet" />
      )}
      {!loading && data && data.projectsList.length > 0 && (
        <Table
          className="mt-6"
          data={data.projectsList}
          columns={PROJECTS_TABLE_COLUMNS}
          fetchMore={fetchMore}
          totalCount={data.projectsList.length}
        />
      )}
      {/* <ClientsFilterModal
        isOpen={isFilterModalOpen}
        close={closeFilterModal}
        filter={filter}
        setFilter={setFilter}
      /> */}
    </SidebarLayout>
  );
};
