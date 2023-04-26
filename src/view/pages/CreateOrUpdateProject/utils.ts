import { ClientType, ProjectPhaseChoice } from '~/services/gql/__generated__/globalTypes';
import { isNumber } from '~/utils/isNumber';

import { FetchProjectQuery } from './__generated__/schema';
import { AddOrEditClientTeamMemberFormValues } from './components/ClientTeamSection/components/AddOrEditModal/hooks/useAddOrEditClientTeamMemberForm';
import { ProjectFormValues } from './hooks/useProjectForm';

interface ClientTeamMember extends Pick<ClientType, 'fullName' | 'email'> {
  phone: string;
  position: string;
  notes: string;
  pointContact: boolean;
}

export function transformProjectPrefilledData(
  data: FetchProjectQuery['project'],
): ProjectFormValues {
  return {
    name: data.name,
    hoursEstimated: isNumber(data.hoursEstimated) ? Number(data.hoursEstimated).toString() : '',
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
    design: data.design ?? '',
    roadmap: data.roadmap ?? '',
    notes: data.notes ?? '',
    phase: data.phase ?? ProjectPhaseChoice.PRE_SIGNED,
    status: Number(data.status?.id),
    documentTemplate: [],
    platforms: data.platforms?.map(({ id }) => id) ?? [],
    clientTeam: data.clientTeam as ClientTeamMember[],
  };
}

export function transformClientTeamMemberPrefilledData(
  data: ClientType,
): AddOrEditClientTeamMemberFormValues {
  return {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone ?? '',
    position: data.position ?? '',
    notes: data.notes ?? '',
    pointContact: !!data.pointContact,
  };
}
