import './styles.scss';

import { Checkbox, Field, FieldProps } from '@appello/web-ui';
import clsx from 'clsx';
import React, { ReactElement, useCallback, useEffect } from 'react';
import { Control, FieldPath, FieldPathValue, FieldValues, useController } from 'react-hook-form';

export interface ChexboxGroupItem<T> {
  label: string;
  value: T;
}

export interface ChexboxGroupFieldProps<TFormValues extends FieldValues>
  extends Pick<FieldProps, 'label' | 'className' | 'required'> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  items: ChexboxGroupItem<FieldPathValue<TFormValues, FieldPath<TFormValues>>>[];
  label?: string;
  className?: string;
  required?: boolean;
  inColumn?: boolean;
}

export const ChexboxGroupField = <TFormValues extends FieldValues>({
  items,
  control,
  name,
  label,
  className,
  required,
  inColumn,
}: ChexboxGroupFieldProps<TFormValues>): ReactElement => {
  // const { items, control, name, label, className, required } = useCombinedPropsWithKit({
  //   name: 'ChexboxGroupField',
  //   props,
  // });

  const {
    field: { onChange },
  } = useController({ name, control });

  const [fieldValues, setFieldValues] = React.useState<number[]>([]);

  useEffect(() => {
    onChange(fieldValues);
  }, [fieldValues, onChange]);

  const handleOnChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = ev.target;
    if (checked) {
      setFieldValues(state => [...state, +value]);
    } else {
      setFieldValues(state => state.filter(itemValue => itemValue !== +value));
    }
  }, []);

  return (
    <Field {...{ label, className, required }}>
      <div className={clsx('chexbox-group', inColumn && 'chexbox-group--column')}>
        {items.map((item, index) => (
          <Checkbox
            key={index}
            checked={fieldValues.includes(item.value)}
            onChange={handleOnChange}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>
    </Field>
  );
};
