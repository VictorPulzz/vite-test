import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { Permission } from '~/constants/permissions';
import { ROUTES } from '~/constants/routes';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { NoAccessMessage } from '~/view/components/NoAccessMessage';
import { SectionContainer } from '~/view/components/SectionContainer';
import { useHasAccess } from '~/view/hooks/useHasAccess';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Docs } from '~/view/pages/ProjectDetails/components/Docs';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { Loader } from '~/view/ui/components/common/Loader';
import { Tabs } from '~/view/ui/components/common/Tabs';

import { useFetchUserDetailsQuery } from './__generated__/schema';
import { Projects } from './components/Projects';
import { UserHistory } from './components/UserHistory';
import styles from './styles.module.scss';

export const UserDetailsPage: FC = () => {
  const canEditUser = useHasAccess(Permission.EDIT_USER);
  const canReadUserDocs = useHasAccess(Permission.READ_USER_DOCS);
  const canReadUserHistory = useHasAccess(Permission.READ_USER_HISTORY);

  const navigate = useNavigate();
  const params = useParams();
  const userId = useMemo(() => (params.id ? Number(params.id) : 0), [params.id]);

  const { data, loading } = useFetchUserDetailsQuery({
    variables: {
      input: { id: userId },
    },
  });

  const { photo, fullName, email, department, role, isActive, contractType, birthDate, address } =
    data?.userDetails ?? {};

  const UserDetailsTabs = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName={styles['tabs__body']}
        items={[
          {
            title: 'Projects',
            element: <Projects userId={userId} />,
          },
          {
            title: 'Docs',
            element: canReadUserDocs ? (
              <Docs userId={userId} />
            ) : (
              <NoAccessMessage className="h-[70vh]" />
            ),
          },
          {
            title: 'History',
            element: canReadUserHistory ? (
              <UserHistory userId={userId} />
            ) : (
              <NoAccessMessage className="h-[70vh]" />
            ),
          },
        ]}
      />
    ),
    [canReadUserDocs, canReadUserHistory, userId],
  );

  return (
    <SidebarLayout>
      <DetailLayout
        title="User details"
        onClickBackButton={() => navigate(-1)}
        rightHeaderElement={
          canEditUser && (
            <Button
              variant={ButtonVariant.SECONDARY}
              label="Edit user"
              className="w-36"
              withIcon="edit"
              onClick={() => navigate(generatePath(ROUTES.EDIT_USER, { id: userId }))}
            />
          )
        }
        contentClassName="flex-auto"
      >
        {loading && (
          <div className="flex h-full items-center">
            <Loader full colorful />
          </div>
        )}
        {data && (
          <div className="flex gap-5 p-6 h-full">
            <SectionContainer containerClassName="w-[382px] min-w-[382px] h-fit">
              <div className="flex items-center gap-3 border-b-[1px] border-solid text-gray-6 pb-7">
                <Avatar uri={photo?.url || photoPlaceholder} size={50} />
                <div className="flex flex-col gap-2">
                  <h2 className="text-p1 text-primary font-bold leading-none">{fullName}</h2>
                  <span className="text-p4 text-gray-2">{email}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-7">
                {department && (
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Department</span>
                    <span className="text-p3 text-primary leading-none">{department.name}</span>
                  </div>
                )}
                {role && (
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Role</span>
                    <span className="text-p3 text-primary leading-none">{role.name}</span>
                  </div>
                )}
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Status</span>
                  <span
                    className={`text-p3 leading-none ${isActive ? 'text-green' : 'text-primary'}`}
                  >
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {contractType && (
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Contract type</span>
                    <span className="text-p3 text-primary leading-none">
                      {convertUppercaseToReadable(contractType)}
                    </span>
                  </div>
                )}
                {birthDate && (
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Date of Birth</span>
                    <span className="text-p3 text-primary leading-none">
                      {format(new Date(birthDate), DateFormat.DMY)}
                    </span>
                  </div>
                )}

                {address && (
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-c1 text-gray-2">Address</span>
                    <span className="text-p3 text-primary  break-words leading-4">{address}</span>
                  </div>
                )}
              </div>
            </SectionContainer>
            <div className="shadow-4 bg-white rounded-md flex-auto">{UserDetailsTabs}</div>
          </div>
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
