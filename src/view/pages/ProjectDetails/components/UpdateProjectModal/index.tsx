import { Button, ButtonSize, ButtonVariant } from '@ui/components/common/Button';
import { DateField } from '@ui/components/form/DateField';
import { InlineFields } from '@ui/components/form/InlineFields';
import { SelectField } from '@ui/components/form/SelectField';
import { TextField } from '@ui/components/form/TextField';
import React, { FC } from 'react';
import { useFieldArray } from 'react-hook-form';
import { ExtractRouteParams } from 'react-router';
import { useParams } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import { Modal, ModalProps } from '~/view/ui/components/common/Modal';
import { TextAreaField } from '~/view/ui/components/form/TextAreaField';

import { SectionNumber } from '../../consts';
import { useUpdateProjectForm } from '../../hooks/useUpdateProjectForm';
import styles from './styles.module.scss';

interface Props extends Pick<ModalProps, 'close' | 'isOpen'> {
  sectionNumber: number;
}

export const UpdateProjectModal: FC<Props> = ({ isOpen, close, sectionNumber }) => {
  const params = useParams<ExtractRouteParams<typeof ROUTES.PROJECT_DETAILS, string>>();
  const projectId = params.id ? Number(params.id) : undefined;

  // TODO add edit mode when backend will be ready
  // const { data, loading} = useFetchProjectQuery({
  //   variables: {
  //     id: projectId,
  //   },
  //  });

  const {
    form: { control, formState },
    handleSubmit,
  } = useUpdateProjectForm({
    onSubmitSuccessful: () => close(),
    // TODO set prefilledData from useFetchProjectQuery when backend will be ready
    prefilledData: { id: projectId ?? 0 },
    id: projectId,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'clientTeamMembers',
  });

  const clientTeamMemberFields = { name: '', position: '', email: '', phone: '' };

  return (
    <Modal withCloseButton isOpen={isOpen} close={close} contentClassName="w-1/2">
      {sectionNumber === SectionNumber.PROJECT_INFO && (
        <section>
          <h2 className={styles['section__heading']}>Project info</h2>
          <InlineFields>
            <TextField name="name" control={control} label="Name" required />
            <SelectField name="status" options={[]} control={control} label="Status" />
          </InlineFields>
          <InlineFields>
            <InlineFields>
              <DateField
                name="estimatedStartDate"
                control={control}
                label="Estimated start date"
                required
              />
              <DateField
                name="estimatedEndDate"
                control={control}
                label="Estimated end date"
                required
              />
            </InlineFields>
            <TextField name="designLink" control={control} label="Design link" />
          </InlineFields>
          <TextAreaField name="notes" control={control} label="Notes" />
        </section>
      )}
      {sectionNumber === SectionNumber.CLIENT_DETAILS && (
        <>
          <section className={styles['section']}>
            <h2 className={styles['section__heading']}>Client info</h2>
            <InlineFields>
              <TextField name="clientName" control={control} label="Client name" required />
              <TextField name="clientPhone" control={control} label="Phone" required />
              <TextField name="clientEmail" control={control} label="Email" required />
              <TextField name="clientNotes" control={control} label="Notes " />
            </InlineFields>
          </section>
          <section>
            <h2 className={styles['section__heading']}>Client team</h2>
            <div>
              {fields.map((field, index) => (
                <div key={field.id} className={styles['section']}>
                  <InlineFields>
                    <TextField
                      name={`clientTeamMembers.${index}.name`}
                      control={control}
                      label="Name"
                    />
                    <TextField
                      name={`clientTeamMembers.${index}.position`}
                      control={control}
                      label="Position"
                    />
                    <TextField
                      name={`clientTeamMembers.${index}.email`}
                      control={control}
                      label="Email"
                    />
                    <TextField
                      name={`clientTeamMembers.${index}.phone`}
                      control={control}
                      label="Phone "
                    />
                  </InlineFields>
                  <Button
                    variant={ButtonVariant.NEGATIVE}
                    label="Remove"
                    className="w-20 mt-4"
                    onClick={() => remove(index)}
                    size={ButtonSize.SMALL}
                  />
                </div>
              ))}
            </div>
            <Button
              variant={ButtonVariant.SECONDARY}
              label="+ Add team member"
              className="w-1/2 mt-6"
              onClick={() => append(clientTeamMemberFields)}
            />
          </section>
        </>
      )}
      <Button
        variant={ButtonVariant.PRIMARY}
        label="Save"
        className="w-1/2 mt-6"
        onClick={handleSubmit}
        isLoading={formState.isSubmitting}
      />
    </Modal>
  );
};
