import React from 'react';
import { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
  userName: string;
}

export const UserNameTooltip: FC<Props> = ({ userName }) => {
  return (
    <div className="absolute whitespace-nowrap right-[-2px] bottom-[45px] bg-[#404548] text-white py-2 px-3 rounded-xl hidden group-hover:block">
      <span className="whitespace-nowrap">{userName}</span>
      <div className={styles['triangle']} />
    </div>
  );
};
