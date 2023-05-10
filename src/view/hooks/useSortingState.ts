import { SortingState } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import { OrderDirectionChoice } from '~/services/gql/__generated__/globalTypes';

export type Sorting<T> = {
  field: T;
  direction: OrderDirectionChoice;
}[];

interface UseSortingStateReturn<TField> {
  tableSorting: SortingState;
  setTableSorting: Dispatch<SetStateAction<SortingState>>;
  sorting: Sorting<TField>;
}

export function useSortingState<TField>(): UseSortingStateReturn<TField> {
  const [tableSorting, setTableSorting] = useState<SortingState>([]);

  const sorting = useMemo(() => {
    return tableSorting.map(state => {
      const field = state.id as TField;
      const direction = state.desc ? OrderDirectionChoice.DESC : OrderDirectionChoice.ASC;

      return { field, direction };
    });
  }, [tableSorting]);

  return { tableSorting, setTableSorting, sorting };
}
