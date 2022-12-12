import { Field } from '@ui/components/form/Field';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { Control, FieldPath, FieldPathValue, FieldValues, useController } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import { OnChangeValue } from 'react-select/dist/declarations/src/types';

import styles from './styles.module.scss';

export interface SelectOption<T> {
  label: string;
  value: T;
}

interface Props<TFormValues extends FieldValues, TValue> {
  name: FieldPath<TFormValues>;
  options: SelectOption<TValue>[];
  control: Control<TFormValues>;
  placeholder?: string;

  // field props
  label?: string;
  className?: string;
}

const styleProxy = new Proxy(
  {},
  {
    get: (_, name) => (style: StylesConfig) => {
      if (name === 'menuPortal') {
        return style;
      }
      return undefined;
    },
  },
);

export const SelectField = <
  TFormValues extends FieldValues,
  TValue extends FieldPathValue<TFormValues, FieldPath<TFormValues>>,
>({
  control,
  name,
  options,
  placeholder,
  label,
  className,
}: Props<TFormValues, TValue>): React.ReactElement => {
  const controller = useController({ name, control });
  const value = controller.field.value as TValue;

  const selectedOption = useMemo(
    () => options.find(option => option.value === value),
    [options, value],
  );

  const handleChange = useCallback(
    (option: OnChangeValue<SelectOption<TValue>, false>) => {
      if (Array.isArray(option)) {
        // todo: handle multi value
      } else if (option) {
        controller.field.onChange(option.value);
      }
    },
    [controller.field],
  );

  return (
    <Field label={label} error={controller.fieldState.error} className={className}>
      <Select
        className={styles['select']}
        isMulti={false}
        options={options}
        onChange={handleChange}
        value={selectedOption}
        placeholder={placeholder}
        styles={styleProxy}
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        menuPosition="fixed"
      />
    </Field>
  );
};
