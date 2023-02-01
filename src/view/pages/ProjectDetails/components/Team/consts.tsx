import { createColumnHelper } from '@tanstack/react-table';

import { ClientType } from '~/services/gql/__generated__/globalTypes';

const columnHelper = createColumnHelper<Omit<ClientType, 'id' | '__typename'>>();

export const TEAM_TABLE_COLUMNS = [
  columnHelper.accessor('fullName', {
    id: 'fullName',
    header: 'Name',
  }),
  columnHelper.accessor('position', {
    id: 'position',
    header: 'Position',
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: 'Email',
  }),
];
