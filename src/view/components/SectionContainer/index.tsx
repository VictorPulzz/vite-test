import clsx from 'clsx';
import React from 'react';

interface SectionContainerProps {
  title?: string;
  subTitle?: string;
  containerClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
  rightHeaderElement?: React.ReactNode;
  children: React.ReactNode;
  withHeader?: boolean;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  subTitle,
  children,
  containerClassName,
  titleClassName,
  subTitleClassName,
  rightHeaderElement,
  withHeader = true,
}) => {
  return (
    <section className={clsx('section-container', containerClassName)}>
      {withHeader && (
        <div className={clsx(rightHeaderElement && 'flex items-center justify-between')}>
          <div className="flex flex-col">
            {title && (
              <h2
                className={clsx(
                  'text-p1 font-bold',
                  titleClassName || subTitle ? 'pb-0' : 'pb-2',
                  titleClassName,
                )}
              >
                {title}
              </h2>
            )}
            {subTitle && (
              <span className={clsx('text-p6 text-gray-1', subTitleClassName)}>{subTitle}</span>
            )}
          </div>
          {rightHeaderElement && <div>{rightHeaderElement}</div>}
        </div>
      )}
      {children}
    </section>
  );
};
