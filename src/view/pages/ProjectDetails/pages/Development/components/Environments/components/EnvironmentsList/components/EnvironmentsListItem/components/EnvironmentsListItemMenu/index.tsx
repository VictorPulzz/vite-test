import { getGqlError, useSwitchValue } from '@appello/common';
import { Icon } from '@appello/web-ui';
import Tippy from '@tippyjs/react';
import React, { FC, useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import { ConfirmActionModal } from '~/view/components/ConfirmActionModal';
import { Dropdown, DropdownItem, DropdownPropsRef } from '~/view/components/Dropdown';
import {
  FetchProjectEnvironmentsListDocument,
  useRemoveProjectEnvironmentMutation,
} from '~/view/pages/ProjectDetails/__generated__/schema';

import { CreateOrUpdateEnvironmentModal } from '../../../../../CreateOrUpdateEnvironmentModal';

interface Props {
  id: number;
  name: string;
  title: string;
}

export const EnvironmentsListItemMenu: FC<Props> = ({ id, name, title }) => {
  const {
    value: isCreateOrUpdateEnvironmentModalOpen,
    on: openCreateOrUpdateEnvironmentModal,
    off: closeCreateOrUpdateEnvironmentModal,
  } = useSwitchValue(false);

  const {
    value: isConfirmActionModal,
    on: openConfirmActionModal,
    off: closeConfirmActionModal,
  } = useSwitchValue(false);

  const dropdownRef = useRef<DropdownPropsRef>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const showDropdown = () => {
    dropdownRef?.current?.setDropdownOpen(true);
    setVisible(true);
  };
  const hideDropdown = () => setVisible(false);

  const [removeEnvironment] = useRemoveProjectEnvironmentMutation();

  const removeCurrentEnvironment = useCallback(() => {
    return toast.promise(
      removeEnvironment({
        variables: {
          input: { id },
        },
        refetchQueries: [FetchProjectEnvironmentsListDocument],
      }),
      {
        loading: 'Deleting environment...',
        success: 'Environment deleted',
        error: e => {
          const errors = getGqlError(e?.graphQLErrors);
          return `Error while deleting environment: ${JSON.stringify(errors)}`;
        },
      },
    );
  }, [id, removeEnvironment]);

  const options: DropdownItem[] = [
    {
      label: 'Edit',
      onSelect: openCreateOrUpdateEnvironmentModal,
    },
    {
      label: 'Delete',
      onSelect: openConfirmActionModal,
      className: 'text-red',
    },
  ];

  return (
    <>
      <Tippy
        interactive
        content={<Dropdown containerWidth="14.93rem" items={options} ref={dropdownRef} />}
        placement="left-start"
        visible={visible}
        onClickOutside={hideDropdown}
      >
        <button type="button" onClick={visible ? hideDropdown : showDropdown}>
          <Icon name="menu" size={16} />
        </button>
      </Tippy>
      {isCreateOrUpdateEnvironmentModalOpen && (
        <CreateOrUpdateEnvironmentModal
          close={closeCreateOrUpdateEnvironmentModal}
          environmentId={id}
          isOpen={isCreateOrUpdateEnvironmentModalOpen}
        />
      )}
      {isConfirmActionModal && (
        <ConfirmActionModal
          action="delete"
          close={closeConfirmActionModal}
          description="You will not be able to recover it"
          isOpen={isConfirmActionModal}
          name={`${convertUppercaseToReadable(name)} • ${title}`}
          onAccept={removeCurrentEnvironment}
        />
      )}
    </>
  );
};
