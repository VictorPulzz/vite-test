import { SelectOption } from '@ui/components/form/SelectField';

import { convertUppercaseToReadable } from './convertUppercaseToReadable';

export function enumToSelectOptions<TEnumValue extends string>(
  enumList: Record<string, TEnumValue>,
): SelectOption<TEnumValue>[] {
  return Object.values(enumList).map(gender => ({
    label: convertUppercaseToReadable(gender),
    value: gender,
  }));
}
