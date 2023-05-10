import { RequestType } from '~/services/gql/__generated__/globalTypes';

export type RequestEnvType = Pick<RequestType, 'id' | 'environment'>;
