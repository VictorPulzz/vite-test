import { PaginationInput } from '~/services/gql/__generated__/globalTypes';

export interface LeadsListRequest extends PaginationInput {
  search?: string;
}

export interface LeadsListResponse {
  total: number;
  items: { id: string; name: Nullable<string>; createdAt: Nullable<string> }[];
}

export interface LeadDetailsResponse {
  id: string;
  name: string;
  about?: Nullable<string>;
  createdAt: string;
}

export interface CreateLeadRequest {
  name: string;
  about: string;
}

export interface MessagesResponse {
  id: string;
  leadId: string;
  promptText: string;
  generatedText?: Nullable<string>;
  createdAt: string;
}

export interface CreateMessageRequest {
  id: string;
  promptText: string;
}

export interface PropmtsListRequest extends LeadsListRequest {
  showAll?: boolean;
}

export interface PropmtsListResponse {
  total: number;
  items: { id: string; name: string; promptText: string }[];
}

export interface CreateOrUpdatePromptRequest {
  id?: string;
  name: string;
  promptText: string;
}

export interface PropmtInfoResponse {
  id: string;
  name: string;
  promptText: string;
}
