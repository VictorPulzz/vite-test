import { ReportQuestionTypeChoice } from '~/services/gql/__generated__/globalTypes';

import { ReportQuestionsResultType } from '../ProjectDetails/types';
import { SubmitReportFormValues } from './hooks/useSubmitReportForm';

export function setQuestionsDefaultValues(data: ReportQuestionsResultType): SubmitReportFormValues {
  return {
    text: data
      .filter(question => question.type === ReportQuestionTypeChoice.FREE_TEXT)
      .map(item => ({ questionId: item.id, text: '' })),
    date: data
      .filter(question => question.type === ReportQuestionTypeChoice.DATE)
      .map(item => ({ questionId: item.id, date: null })),
    yesNo: data
      .filter(question => question.type === ReportQuestionTypeChoice.YES_OR_NO)
      .map(item => ({ questionId: item.id, yesNo: null })),
    checkboxes: data
      .filter(question => question.type === ReportQuestionTypeChoice.CHECKBOXES)
      .map(item => ({ questionId: item.id, checkboxes: null })),
    singleChoice: data
      .filter(question => question.type === ReportQuestionTypeChoice.SINGLE_CHOICE)
      .map(item => ({ questionId: item.id, singleChoiceId: null })),
  };
}
