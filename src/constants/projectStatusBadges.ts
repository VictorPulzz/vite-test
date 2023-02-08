import { StatusEnum } from '~/services/gql/__generated__/globalTypes';
import { BadgeColor } from '~/view/ui/components/common/Badge';

export const PROJECT_STATUS_BADGES = {
  [StatusEnum.IN_PROGRESS]: BadgeColor.BLUE,
  [StatusEnum.WAITING]: BadgeColor.RED,
  [StatusEnum.STOPPED]: BadgeColor.GRAY,
  [StatusEnum.BLOCKED]: BadgeColor.GREEN,
};
