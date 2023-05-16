import { InlineFields } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { Checkbox } from '@appello/web-ui';
import React, { FC, Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { DocumentTemplateType } from '~/services/gql/__generated__/globalTypes';
import { SectionContainer } from '~/view/components/SectionContainer';

interface Props {
  templates: DocumentTemplateType[];
}

export const GenerateDocumentsSection: FC<Props> = ({ templates }) => {
  const { control, watch, setValue } = useFormContext();

  return (
    <SectionContainer title="Generate docs">
      <div className="mt-3 flex flex-col gap-4">
        {templates.map((template, templateIndex) => (
          <Fragment key={templateIndex}>
            <Controller
              name={`documentTemplate.${templateIndex}.isOpen`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  label={template.name}
                  value={value}
                  onChange={e => {
                    onChange(e);
                    if (!value) {
                      template?.fields?.forEach((_, fieldIndex) =>
                        setValue(
                          `documentTemplate.${templateIndex}.templateFields.${fieldIndex}.value`,
                          '',
                        ),
                      );
                    }
                  }}
                />
              )}
            />
            {watch(`documentTemplate.${templateIndex}.isOpen`) && (
              <InlineFields>
                {template?.fields?.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    <TextField
                      name={`documentTemplate.${templateIndex}.templateFields.${fieldIndex}.value`}
                      control={control}
                      label={field.description ?? ''}
                      required
                    />
                  </div>
                ))}
              </InlineFields>
            )}
          </Fragment>
        ))}
      </div>
    </SectionContainer>
  );
};
