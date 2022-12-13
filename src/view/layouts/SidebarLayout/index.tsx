import { Icon } from '@ui/components/common/Icon';
import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { ROUTES } from '~/constants/routes';
import logo from '~/view/assets/images/logo.svg';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
  contentClassName?: string;
}

const navItems = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: ROUTES.HOME,
  },
  {
    title: 'Documents',
    icon: 'documents',
    link: ROUTES.DOCUMENTS,
  },
  {
    title: 'Projects',
    icon: 'projects',
    link: ROUTES.PROJECTS,
  },
];

export const SidebarLayout: FC<Props> = ({ children, contentClassName }) => {
  return (
    <div className="flex flex-1">
      <div className={styles['sidebar']}>
        <div className="flex justify-between px-5">
          <Link to={ROUTES.HOME}>
            <img src={logo} alt="Logo" className="w-[4.9rem] h-[1.6rem]" />
          </Link>
        </div>
        <nav className="mt-6">
          <ul>
            {navItems.map(item => (
              <li key={item.link} className="px-3 py-2">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    clsx(styles['nav__link'], { [styles['nav__link--active']]: isActive })
                  }
                >
                  <Icon name={item.icon} size="1.125rem" className="mr-3" />
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={clsx('flex flex-1 flex-col', contentClassName)}>{children}</div>
    </div>
  );
};
