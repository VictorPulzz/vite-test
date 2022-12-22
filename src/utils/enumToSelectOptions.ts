import { SelectOption } from '@ui/components/form/SelectField';

export function enumToSelectOptions<TEnumValue extends string>(
  enumList: Record<string, TEnumValue>,
): SelectOption<TEnumValue>[] {
  return Object.values(enumList).map(gender => ({
    label: gender.charAt(0) + gender.slice(1).split('_').join(' ').toLowerCase(),
    value: gender,
  }));
}
