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

export interface PropmtsListResponse {
  id: string;
  name: string;
  promptText: string;
}

export interface CreateOrUpdatePromptRequest {
  id?: string;
  name: string;
  promptText: string;
}

export interface PropmtInfoResponse extends PropmtsListResponse {}
