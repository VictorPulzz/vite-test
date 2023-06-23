import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SALESAI_API_URL } from '~/constants/env';
import {
  CreateLeadRequest,
  CreateMessageRequest,
  CreateOrUpdatePromptRequest,
  LeadDetailsResponse,
  LeadListResponse,
  MessagesResponse,
  PropmtInfoResponse,
  PropmtsListResponse,
} from '~/services/rtk/lead/types';

import { cacheTags } from './cacheTags';

export const salesAiApi = createApi({
  reducerPath: 'salesAiApi',
  baseQuery: fetchBaseQuery({ baseUrl: SALESAI_API_URL }),
  tagTypes: [cacheTags.SALES_AI_LEAD_MESSAGES],
  endpoints: builder => ({
    getLeads: builder.query<LeadListResponse[], void>({
      query: () => '/leads/',
      providesTags: [cacheTags.SALES_AI_LEADS],
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
      invalidatesTags: [cacheTags.SALES_AI_LEADS],
    }),

    getMessages: builder.query<MessagesResponse[], string>({
      query: id => `/messages/lead/${id}`,
      providesTags: [cacheTags.SALES_AI_LEAD_MESSAGES],
    }),

    createMessage: builder.mutation<MessagesResponse, CreateMessageRequest>({
      query: ({ id, ...data }) => ({
        url: `/leads/${id}/new_message`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [cacheTags.SALES_AI_LEAD_MESSAGES],
    }),

    getPrompts: builder.query<PropmtsListResponse[], void>({
      query: () => '/prompts',
      providesTags: [cacheTags.SALES_AI_PROMPTS],
    }),

    getPromptInfo: builder.query<PropmtInfoResponse, string>({
      query: id => ({
        url: `prompts/${id}`,
        method: 'GET',
      }),
      providesTags: [cacheTags.SALES_AI_PROMPT_INFO],
    }),

    createPrompt: builder.mutation<PropmtInfoResponse, CreateOrUpdatePromptRequest>({
      query: data => ({
        url: '/prompts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [cacheTags.SALES_AI_PROMPTS],
    }),

    updatePrompt: builder.mutation<PropmtInfoResponse, CreateOrUpdatePromptRequest>({
      query: ({ id, ...data }) => ({
        url: `prompts/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: [cacheTags.SALES_AI_PROMPTS, cacheTags.SALES_AI_PROMPT_INFO],
    }),

    removePrompt: builder.mutation<void, string>({
      query: id => ({
        url: `prompts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [cacheTags.SALES_AI_PROMPTS],
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useGetLeadQuery,
  useGetMessagesQuery,
  useCreateMessageMutation,
  useCreateLeadMutation,
  useGetPromptsQuery,
  useRemovePromptMutation,
  useGetPromptInfoQuery,
  useCreatePromptMutation,
  useUpdatePromptMutation,
} = salesAiApi;
