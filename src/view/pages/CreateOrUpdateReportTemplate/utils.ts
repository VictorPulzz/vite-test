import { FetchReportTemplateInfoQuery } from '../AdminSettingsReportTemplates/__generated__/schema';
import { ReportTemplateFormValues } from './hooks/useReportTemplateForm';

export function transformReportTemplatePrefilledData(
  data: FetchReportTemplateInfoQuery['reportTemplate'],
): ReportTemplateFormValues {
  return {
    ...data,
    filledById: data.filledBy.id,
    sendTo: data.sendTo?.map(user => user.id) || [],
    applyToAllProjects: !!data.applyToAllProjects,
  };
}
