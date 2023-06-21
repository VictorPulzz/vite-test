import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SALESAI_API_URL } from '~/constants/env';
import {
  CreateLeadRequest,
  CreateMessageRequest,
  LeadDetailsResponse,
  LeadListResponse,
  MessagesResponse,
} from '~/services/rtk/lead/types';

import { cacheTags } from './cacheTags';

export const leadApi = createApi({
  reducerPath: 'leadApi',
  baseQuery: fetchBaseQuery({ baseUrl: SALESAI_API_URL }),
  tagTypes: [cacheTags.LEAD_MESSAGES],
  endpoints: builder => ({
    getLeads: builder.query<LeadListResponse[], void>({
      query: () => '/leads/',
      providesTags: [cacheTags.LEADS],
    }),
    getLead: builder.query<LeadDetailsResponse, string>({
      query: id => `/leads/${id}`,
    }),
    createLead: builder.mutation<void, CreateLeadRequest>({
      query: data => ({
        url: '/leads',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [cacheTags.LEADS],
    }),
    getMessages: builder.query<MessagesResponse[], string>({
      query: id => `/messages/lead/${id}`,
      providesTags: [cacheTags.LEAD_MESSAGES],
    }),
    createMessage: builder.mutation<MessagesResponse, CreateMessageRequest>({
      query: ({ id, ...data }) => ({
        url: `/leads/${id}/new_message`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [cacheTags.LEAD_MESSAGES],
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useGetLeadQuery,
  useGetMessagesQuery,
  useCreateMessageMutation,
  useCreateLeadMutation,
} = leadApi;
