import { format, formatISO } from 'date-fns';

import { TimeFormat } from '~/constants/dates';

export const convertTimeValueToHMA = (timeString: string): string => {
  const date = formatISO(new Date());
  const time = formatISO(new Date(), { representation: 'time' });
  const replacedTimeDate = date.replace(time, timeString);

  return format(new Date(replacedTimeDate), TimeFormat.TIME_FORMAT);
};
