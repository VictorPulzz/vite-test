import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { SectionContainer } from '~/view/components/SectionContainer';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { Tabs } from '~/view/ui/components/common/Tabs';

import styles from './styles.module.scss';

// TODO remove usersTestData when backend will be ready
const usersTestData = [
  {
    id: 1,
    fullName: 'Jhon Snow',
    photo: null,
    department: 'Frontend',
    email: 'snow@com',
    isActive: true,
    phoneNumber: '0432 032 553',
    dateOfBirth: '02/05/1988',
    address: '24 Central st, Sydney, NSW 2000',
    contractType: 'Fulltime',
  },
  {
    id: 2,
    fullName: 'Adam Grey',
    photo: 'https://picsum.photos/26/26?random=2',
    department: 'Backend',
    email: 'grey@com',
    isActive: true,
    phoneNumber: '0432 032 554',
    dateOfBirth: '02/05/1989',
    address: '25 Central st, Sydney, NSW 2000',
    contractType: 'Fulltime',
  },
  {
    id: 3,
    fullName: 'Bob Black',
    photo: 'https://picsum.photos/26/26?random=3',
    department: 'Backend',
    email: 'black@com',
    isActive: true,
    phoneNumber: '0432 032 555',
    dateOfBirth: '02/05/1990',
    address: '26 Central st, Sydney, NSW 2000',
    contractType: 'Fulltime',
  },
  {
    id: 4,
    fullName: 'Jack Green',
    photo: 'https://picsum.photos/26/26?random=4',
    department: 'Backend',
    email: 'green@com',
    isActive: false,
    phoneNumber: '0432 032 556',
    dateOfBirth: '02/05/1991',
    address: '27 Central st, Sydney, NSW 2000',
    contractType: 'Fulltime',
  },
];

export const UserDetailsPage: FC = () => {
  const params = useParams();
  const userId = params.id ? Number(params.id) : 0;

  // TODO remove employeeById when backend will be ready
  const userById = useMemo(() => usersTestData.find(user => user.id === userId), [userId]);

  // const { data, loading } = useFetchUserDetailsQuery({
  //   variables: {
  //     data: { id: userById },
  //   },
  // });

  // TODO remove when backend will be ready
  const loading = false;

  const UserDetailsTabs = useMemo(
    () => (
      <Tabs
        className={styles['tabs']}
        contentClassName="p-7 flex-auto"
        items={[
          {
            title: 'Projects',
            element: <span>Projects</span>,
          },
          {
            title: 'Docs',
            element: <span>Docs</span>,
          },
          {
            title: 'History',
            element: <span>History</span>,
          },
        ]}
      />
    ),
    [],
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
        {loading ? (
          <span>LOADING</span>
        ) : (
          <div className="flex gap-5 p-6">
            <SectionContainer containerClassName="w-[382px] min-w-[382px]">
              <div className="flex items-center gap-3 border-b-[1px] border-solid text-gray-6 pb-7">
                <Avatar uri={userById?.photo || photoPlaceholder} size={50} />
                <div className="flex flex-col gap-2">
                  <h2 className="text-p1 text-primary font-bold leading-none">
                    {userById?.fullName}
                  </h2>
                  <span className="text-p4 text-gray-2">ID {userById?.email}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-7">
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Department</span>
                  <span className="text-p3 text-primary leading-none">{userById?.department}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Role</span>
                  <span className="text-p3 text-primary leading-none">{userById?.department}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Position</span>
                  <span className="text-p3 text-primary leading-none">{userById?.department}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Status</span>
                  <span
                    className={`text-p3 leading-none ${
                      userById?.isActive ? 'text-green' : 'text-primary'
                    }`}
                  >
                    {userById?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Contract type</span>
                  <span className="text-p3 text-primary leading-none">
                    {userById?.contractType}
                  </span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Date of Birth</span>
                  <span className="text-p3 text-primary leading-none">{userById?.dateOfBirth}</span>
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className="text-c1 text-gray-2">Address</span>
                  <span className="text-p3 text-primary leading-none">{userById?.address}</span>
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
