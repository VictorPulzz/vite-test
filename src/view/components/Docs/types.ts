import {
  FetchClientDocumentsQuery,
  FetchInternalDocumentsQuery,
  FetchProjectDocumentsQuery,
  FetchUserDocumentsQuery,
} from './__generated__/schema';

export enum DocsType {
  INTERNAL = 'INTERNAL',
  CLIENT = 'CLIENT',
  PROJECT = 'PROJECT',
  USER = 'USER',
}

export type DocsListType =
  | FetchProjectDocumentsQuery['projectDocumentList']
  | FetchUserDocumentsQuery['documentUserList']
  | FetchInternalDocumentsQuery['documentInternalList']
  | FetchClientDocumentsQuery['documentClientList'];
