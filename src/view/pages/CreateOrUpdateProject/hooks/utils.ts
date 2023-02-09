import { isNumber } from '~/utils/isNumber';

import { FetchProjectQuery } from '../__generated__/schema';
import { ProjectFormValues } from './useProjectForm';

export function transformPrefilledData(data: FetchProjectQuery['project']): ProjectFormValues {
  return {
    name: data.name,
    hoursEstimated: isNumber(data?.hoursEstimated) ? Number(data.hoursEstimated).toString() : '',
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
    design: data.design ?? '',
    roadmap: data.roadmap ?? '',
    notes: data.notes ?? '',
    phase: data.phase,
    // TODO fix fields below when backend will be ready
    isGenerateDesignAndPrototypeAgreement: false,
    isGenerateServiceAgreement: true,
    companyName: '',
    companyAcn: '',
    depositHours: '',
    hourlyRate: '',
    address: '',
    abn: '',
  };
}
