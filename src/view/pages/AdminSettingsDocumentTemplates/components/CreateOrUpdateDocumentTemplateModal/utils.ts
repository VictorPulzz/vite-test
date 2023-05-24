import { FetchDocumentTemplateInfoQuery } from '../../__generated__/schema';
import { DocumentTemplateFormValues } from './hooks/useDocumentTemplateForm';

export function transformDocumentTemplatePrefilledData(
  data: FetchDocumentTemplateInfoQuery['documentTemplate'],
): DocumentTemplateFormValues {
  return {
    name: data.name,
    url: data.url ?? '',
    description: data.description ?? '',
    fields:
      data.fields?.map(field => ({ name: field.name, description: field.description ?? '' })) ?? [],
  };
}
