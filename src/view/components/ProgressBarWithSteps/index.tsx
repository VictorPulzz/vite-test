import { Icon } from '@appello/web-ui';
import clsx from 'clsx';
import React, { FC } from 'react';

import styles from './styles.module.scss';

interface Props {
  currentStep: number;
}

const steps = [
  { count: 1, stepTitle: 'Signed' },
  { count: 2, stepTitle: 'Design' },
  { count: 3, stepTitle: 'Development' },
  { count: 4, stepTitle: 'Released' },
];

export const ProgressBarWithSteps: FC<Props> = ({ currentStep }) => {
  return (
    <div className="flex items-center">
      {steps.map(({ count, stepTitle }) => (
        <div key={count} className="flex flex-col gap-[5px]">
          <div className="flex items-center">
            {currentStep <= count && currentStep !== steps.length ? (
              <div
                className={clsx(styles['circle'], {
                  [styles['circle--active']]: currentStep === count,
                })}
              />
            ) : (
              <Icon color="#fff" name="check" size={14} className={styles['circle--completed']} />
            )}
            {count !== steps.length && (
              <div
                className={clsx(styles['line'], {
                  [styles['line--completed']]: currentStep > count,
                })}
              />
            )}
          </div>
          <span
            className={`text-p5 ${
              currentStep > count || currentStep === steps.length ? 'opacity-40' : 'text-gray-1'
            }`}
          >
            Phase {count}
          </span>
          <span
            className={`text-p3 leading-none ${
              currentStep > count || currentStep === steps.length ? 'opacity-40' : 'text-gray-1'
            }`}
          >
            {stepTitle}
          </span>
        </div>
      ))}
    </div>
  );
};
