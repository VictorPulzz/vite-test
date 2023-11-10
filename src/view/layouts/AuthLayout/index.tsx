import React, { FC, ReactNode } from 'react';

import logo from '~/view/assets/images/logo.svg';

import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
}

export const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-1">
      <div className={styles['aside']}>
        <img alt="Logo" className={styles['aside__logo']} src={logo} />
      </div>
      <div className="flex-center flex-1 flex-col">
        <div className={styles['children']}>{children}</div>
      </div>
    </div>
  );
};
