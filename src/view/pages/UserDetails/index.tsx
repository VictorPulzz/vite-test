import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { convertUppercaseToReadable } from '~/utils/convertUppercaseToReadable';
import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { SectionContainer } from '~/view/components/SectionContainer';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { Loader } from '~/view/ui/components/common/Loader';
import { Tabs } from '~/view/ui/components/common/Tabs';

import { useFetchUserDetailsQuery } from './__generated__/schema';
import { Docs } from './components/Docs';
import { Projects } from './components/Projects';
import { UserHistory } from './components/UserHistory';
import styles from './styles.module.scss';

export const UserDetailsPage: FC = () => {
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
        contentClassName="p-7 flex-auto"
        items={[
          {
            title: 'Projects',
            element: <Projects userId={userId} />,
          },
          {
            title: 'Docs',
            element: <Docs userId={userId} />,
          },
          {
            title: 'History',
            element: <UserHistory userId={userId} />,
          },
        ]}
      />
    ),
    [userId],
  );

  return (
    <SidebarLayout>
      <DetailLayout
        title="User details"
        rightHeaderElement={
          <Button
            variant={ButtonVariant.SECONDARY}
            label="Edit user"
            className="w-36"
            withIcon="edit"
            onClick={() => null}
          />
        }
      >
        {loading && (
          <div className="pt-6">
            <Loader full colorful />
          </div>
        )}
        {data && (
          <div className="flex gap-5 p-6 min-h-[calc(90vh+2rem)]">
            <SectionContainer containerClassName="w-[382px] min-w-[382px]">
              <div className="flex items-center gap-3 border-b-[1px] border-solid text-gray-6 pb-7">
                <Avatar uri={photo?.url || photoPlaceholder} size={50} />
                <div className="flex flex-col gap-2">
                  <h2 className="text-p1 text-primary font-bold leading-none">{fullName}</h2>
                  <span className="text-p4 text-gray-2">{email}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-7">
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Department</span>
                  <span className="text-p3 text-primary leading-none">{department?.name}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Role</span>
                  <span className="text-p3 text-primary leading-none">{role?.name}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Status</span>
                  <span
                    className={`text-p3 leading-none ${isActive ? 'text-green' : 'text-primary'}`}
                  >
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Contract type</span>
                  <span className="text-p3 text-primary leading-none">
                    {convertUppercaseToReadable(contractType ?? '-')}
                  </span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Date of Birth</span>
                  <span className="text-p3 text-primary leading-none">
                    {birthDate ? format(new Date(birthDate ?? ''), DateFormat.DMY) : '-'}
                  </span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Address</span>
                  <span className="text-p3 text-primary leading-none">{address ?? '-'}</span>
                </div>
              </div>
            </SectionContainer>
            <div className="shadow-4 bg-white rounded-md flex-auto">{UserDetailsTabs}</div>
          </div>
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
