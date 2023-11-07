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
    questions: data.questions.map(question => ({
      id: question.id,
      type: question.type,
      questionText: question.questionText,
      options: question.options.map(option => ({ id: option.id, text: option.text, isNew: false })),
      isNew: false,
      showOnOverview: question.showOnOverview,
    })),
  };
}
