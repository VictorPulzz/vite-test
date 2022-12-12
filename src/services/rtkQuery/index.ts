import { axiosBaseQuery } from '@appello/common/lib/services/rtkQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const rtkQuery = createApi({
  reducerPath: 'rtkReducer',
  baseQuery: axiosBaseQuery(),
  tagTypes: [],
  endpoints: () => ({}),
});
