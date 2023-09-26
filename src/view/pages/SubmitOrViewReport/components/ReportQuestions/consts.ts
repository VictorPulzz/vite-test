import { ReportQuestionTypeChoice } from '~/services/gql/__generated__/globalTypes';

export const REPORT_QUESTION_LABEL = {
  [ReportQuestionTypeChoice.FREE_TEXT]: 'Free text',
  [ReportQuestionTypeChoice.DATE]: 'Date',
  [ReportQuestionTypeChoice.YES_OR_NO]: 'Yes/No',
  [ReportQuestionTypeChoice.CHECKBOXES]: 'Checkboxes',
  [ReportQuestionTypeChoice.SINGLE_CHOICE]: 'Single choice',
};
