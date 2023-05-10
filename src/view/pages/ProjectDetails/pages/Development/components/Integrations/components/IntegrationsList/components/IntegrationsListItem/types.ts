import { RequestType } from '~/services/gql/__generated__/globalTypes';

export type RequestIntegrationType = Pick<RequestType, 'id' | 'integrationName'>;
