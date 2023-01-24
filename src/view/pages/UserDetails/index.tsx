import React, { FC, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import photoPlaceholder from '~/view/assets/images/photo-placeholder.svg';
import { Avatar } from '~/view/components/Avatar';
import { Tabs } from '~/view/components/Tabs';
import { DetailLayout } from '~/view/layouts/DetailLayout';
import { SidebarLayout } from '~/view/layouts/SidebarLayout';
import { Badge, BadgeColor } from '~/view/ui/components/common/Badge';

import { PROJECT_DETAILS_TABS } from './consts';

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
    isActive: false,
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

  const [activeTabId, setActiveTabId] = useState<number>(1);

  const handleActiveTabChange = useCallback((index: number) => setActiveTabId(index), []);

  return (
    <SidebarLayout>
      <DetailLayout title="User details">
        {loading ? (
          <span>LOADING</span>
        ) : (
          <div className="flex gap-5 p-6">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 shadow-4 bg-white rounded-md p-7 w-[382px] min-w-[382px]">
                <Avatar uri={userById?.photo || photoPlaceholder} size={50} />
                <div className="flex flex-col gap-2">
                  <h2 className="text-p1 font-bold leading-none">{userById?.fullName}</h2>
                  <span className="text-p4 text-gray-2">ID {userById?.id}</span>
                </div>
              </div>
              <div className="shadow-4 bg-white rounded-md p-7 w-[382px] min-w-[382px] flex-auto">
                <div>
                  <h2 className="mb-3 text-p1 font-bold">User info</h2>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Mobile</span>
                      <span className="text-p3 text-blue leading-none">
                        {userById?.phoneNumber}
                      </span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Email</span>
                      <span className="text-p3 text-blue leading-none">{userById?.email}</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Department</span>
                      <span className="text-p3 text-primary leading-none">
                        {userById?.department}
                      </span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Date of Birth</span>
                      <span className="text-p3 text-primary leading-none">
                        {userById?.dateOfBirth}
                      </span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Address</span>
                      <span className="text-p3 text-primary leading-none">{userById?.address}</span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Contract type</span>
                      <span className="text-p3 text-primary leading-none">
                        {userById?.contractType}
                      </span>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-c1 text-gray-2">Status</span>
                      <Badge color={userById?.isActive ? BadgeColor.GREEN : BadgeColor.GRAY}>
                        {userById?.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-4 bg-white rounded-md flex-auto p7">
              <Tabs
                activeTabId={activeTabId}
                tabs={PROJECT_DETAILS_TABS}
                onChange={handleActiveTabChange}
                tabsClassName="border-b-[1px] border-solid text-gray-6 pt-7 px-7"
                tabsPanelClassName="p-6"
              >
                {activeTabId === 1 && <span>Projects</span>}
                {activeTabId === 2 && <span>Docs</span>}
                {activeTabId === 3 && <span>Roles</span>}
                {activeTabId === 4 && <span>Credentials</span>}
                {activeTabId === 5 && <span>Notes</span>}
                {activeTabId === 6 && <span>History</span>}
              </Tabs>
            </div>
          </div>
        )}
      </DetailLayout>
    </SidebarLayout>
  );
};
