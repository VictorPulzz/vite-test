import { useSwitchValue } from '@appello/common/lib/hooks';
import { Icon, PasswordField } from '@appello/web-ui';
import { SelectField } from '@appello/web-ui';
import { TextField } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC, useMemo } from 'react';
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';

import { RepositoryTypeChoice } from '~/services/gql/__generated__/globalTypes';
import { enumToSelectOptions } from '~/utils/enumToSelectOptions';
import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';

import { ProjectEnvironmentFormValues } from '../../hooks/useProjectEnvironmentForm';

interface Props {
  index: number;
  removeCredentials: UseFieldArrayRemove;
}

export const CredentialsItem: FC<Props> = ({ index, removeCredentials }) => {
  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const { control, formState } = useFormContext<ProjectEnvironmentFormValues>();

  const { isOneLineErrorText, isMultipleLineErrorText } = useMemo(() => {
    const { type, url, shortDescription, login, password } =
      (formState.errors.credentials && formState.errors.credentials[index]) || {};

    return {
      isOneLineErrorText: type || url,
      isMultipleLineErrorText: shortDescription || login || password,
    };
  }, [index, formState]);

  const credentialsTypeOptions = enumToSelectOptions(RepositoryTypeChoice);

  return (
    <div className="grid grid-cols-[1fr,1fr,auto,1fr,1fr,1fr,auto] gap-[10px] items-baseline">
      <SelectField
        required
        control={control}
        label="Type"
        name={`credentials.${index}.type`}
        options={credentialsTypeOptions}
      />
      <TextField
        control={control}
        label="Short description"
        name={`credentials.${index}.shortDescription`}
      />
      <span
        className={clsx(
          'text-gray-2 self-end pb-2',
          isOneLineErrorText && 'pb-[1.813rem]',
          isMultipleLineErrorText && 'pb-[2.938rem]',
        )}
      >
        •
      </span>
      <TextField required control={control} label="Link" name={`credentials.${index}.url`} />
      <TextField control={control} label="Login" name={`credentials.${index}.login`} />
      <PasswordField
        autoComplete="new-password"
        control={control}
        label="Password"
        name={`credentials.${index}.password`}
      />
      <button
        className={clsx(
          'hover:opacity-80 self-end pb-3',
          isOneLineErrorText && 'pb-[2.0625rem]',
          isMultipleLineErrorText && 'pb-[3.188rem]',
        )}
        type="button"
        onClick={openConfirmActionModal}
      >
        <Icon className="flex-shrink-0 text-gray-1" name="trash" size={18} />
      </button>
      {isConfirmActionModal && (
        <ConfirmActionModal
          action="remove"
          close={closeConfirmActionModal}
          isOpen={isConfirmActionModal}
          name="these creds"
          onAccept={() => removeCredentials(index)}
        />
      )}
    </div>
  );
};
