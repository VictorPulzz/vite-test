export interface LeadListResponse {
  id: string;
  name: Nullable<string>;
  createdAt: Nullable<string>;
}

export interface LeadDetailsResponse {
  id: string;
  name: string;
  about?: Nullable<string>;
  createdAt: string;
}

export interface CreateOrUpdateLeadRequest {
  id?: Nullable<string>;
  name: string;
  about: string;
}
export interface MessagesResponse {
  id: string;
  leadId: string;
  generatedText?: Nullable<string>;
  createdAt: string;
}

export interface CreateMessageRequest {
  id: string;
  prompt: string;
}
