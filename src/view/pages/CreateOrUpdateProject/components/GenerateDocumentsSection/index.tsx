import { InlineFields } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import { Checkbox } from '@appello/web-ui';
import React, { FC, Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { SectionContainer } from '~/view/components/SectionContainer';

import { FetchDocumentTemplateListQuery } from '../../__generated__/schema';

interface Props {
  templates: FetchDocumentTemplateListQuery['documentTemplateList']['results'];
}

export const GenerateDocumentsSection: FC<Props> = ({ templates }) => {
  const { control, watch, setValue } = useFormContext();

  return (
    <SectionContainer title="Generate docs">
      <div className="mt-3 flex flex-col gap-4">
        {templates.map((template, templateIndex) => (
          <Fragment key={templateIndex}>
            <Controller
              control={control}
              name={`documentTemplate.${templateIndex}.isOpen`}
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
                      required
                      control={control}
                      label={field.description ?? ''}
                      name={`documentTemplate.${templateIndex}.templateFields.${fieldIndex}.value`}
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
