import { PROJECT_STATUS_BADGES } from '~/constants/projectStatusBadges';
import { StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { BadgeColor } from '~/view/ui/components/common/Badge';

export const getBadgeByProjectStatus = (status: StatusEnum): BadgeColor =>
  PROJECT_STATUS_BADGES[status as StatusEnum];
