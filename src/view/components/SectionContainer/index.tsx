import clsx from 'clsx';
import React from 'react';

interface SectionContainerProps {
  title?: string;
  subTitle?: string;
  containerClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
  children: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  subTitle,
  children,
  containerClassName,
  titleClassName,
  subTitleClassName,
}) => {
  return (
    <section className={clsx('section-container', containerClassName)}>
      {title && (
        <h2 className={clsx('text-p1 font-bold', titleClassName ? 'pb-0' : 'pb-2', titleClassName)}>
          {title}
        </h2>
      )}
      {subTitle && (
        <span className={clsx('text-p6 text-gray-1', subTitleClassName)}>{subTitle}</span>
      )}
      {children}
    </section>
  );
};
