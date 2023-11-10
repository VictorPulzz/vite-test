import { useSelectOptions } from '@appello/common';
import {
  Checkbox,
  InlineFields,
  SelectField,
  TextAreaField,
  TextField,
  TimeField,
} from '@appello/web-ui';
import React, { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { TimeFormat } from '~/constants/dates';
import { UserRole } from '~/constants/roles';
import {
  ReportEmailNotificationChoice,
  ReportRepeatChoice,
  WeekDayChoice,
} from '~/services/gql/__generated__/globalTypes';
import { useFetchUserGlossaryListQuery } from '~/services/gql/__generated__/schema';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { SectionContainer } from '~/view/components/SectionContainer';
import { FetchRolesListQuery } from '~/view/pages/Users/__generated__/schema';

import { ReportTemplateFormValues } from '../../hooks/useReportTemplateForm';

interface Props {
  roles: FetchRolesListQuery['rolesList'];
}

export const SettingsTabElement: FC<Props> = ({ roles }) => {
  const { control, register } = useFormContext<ReportTemplateFormValues>();

  const adminAndPmIds = useMemo(
    () =>
      roles
        .filter(role => [UserRole.ADMIN, UserRole.PM].includes(role.label as UserRole))
        .map(userRole => userRole.value),
    [roles],
  );

  const { data: usersList, loading: isLoadingUsersList } = useFetchUserGlossaryListQuery({
    variables: {
      filters: { roleId: adminAndPmIds },
    },

    fetchPolicy: 'cache-and-network',
  });

  const rolesOptions = useSelectOptions(roles, {
    value: 'value',
    label: 'label',
  });

  const usersOptions = useSelectOptions(usersList?.userGlossaryList.results, {
    value: 'id',
    label: 'fullName',
  });

  const daysOptions = enumToSelectOptions(WeekDayChoice);
  const repeatOptions = enumToSelectOptions(ReportRepeatChoice);
  const emailNotificationsOptions = enumToSelectOptions(ReportEmailNotificationChoice);

  return (
    <div className="mt-7 mb-20 w-[700px] m-auto flex flex-col gap-4">
      <SectionContainer title="About">
        <TextField required control={control} label="Report name" name="name" />
        <TextAreaField
          control={control}
          label="Report description"
          maxLength={500}
          name="description"
        />
      </SectionContainer>
      <SectionContainer title="Reporting rules">
        <SelectField
          required
          control={control}
          label="To be filled by"
          name="filledById"
          options={rolesOptions}
        />
        <InlineFields>
          <SelectField
            required
            control={control}
            label="Report day"
            name="reportDay"
            options={daysOptions}
          />
          <TimeField
            required
            control={control}
            label="Time"
            labelFormat={TimeFormat.TIME_FORMAT}
            name="time"
            step={60}
          />
        </InlineFields>
        <InlineFields>
          <SelectField
            required
            control={control}
            label="Repeat"
            name="repeat"
            options={repeatOptions}
          />
          <SelectField
            required
            control={control}
            label="Email notification"
            name="emailNotification"
            options={emailNotificationsOptions}
          />
        </InlineFields>
        <SelectField
          isMulti
          control={control}
          disabled={isLoadingUsersList}
          label="Send submitted report to email"
          name="sendTo"
          options={usersOptions}
        />
        <div className="flex flex-col">
          <Checkbox
            label="Apply to all projects"
            {...register('applyToAllProjects')}
            className="mt-4"
          />
          <span className="text-p5 text-gray-2 ml-7">
            This template will be automatically applied to all new projects
          </span>
        </div>
      </SectionContainer>
    </div>
  );
};
