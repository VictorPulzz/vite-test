import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SALESAI_API_URL } from '~/constants/env';
import { LeadDetailsResponse, LeadListResponse, MessagesResponse } from '~/services/rtk/lead/types';

// Define a service using a base URL and expected endpoints
export const leadApi = createApi({
  reducerPath: 'leadApi',
  baseQuery: fetchBaseQuery({ baseUrl: SALESAI_API_URL }),
  endpoints: builder => ({
    getLeads: builder.query<LeadListResponse[], void>({
      query: () => '/leads/',
    }),
    getLead: builder.query<LeadDetailsResponse, string>({
      query: id => `/leads/${id}`,
    }),
    getMessages: builder.query<MessagesResponse[], string>({
      query: id => `/messages/lead/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLeadsQuery, useGetLeadQuery, useGetMessagesQuery } = leadApi;
