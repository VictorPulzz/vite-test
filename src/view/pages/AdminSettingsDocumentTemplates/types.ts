import { FetchDocumentTemplatesListQuery } from './__generated__/schema';

export type DocumentTemplatesResultType = Exclude<
  FetchDocumentTemplatesListQuery['documentTemplateList'],
  null | undefined
>[number];
